/* import { createClient } from '@supabase/supabase-js'
import { parse } from 'csv-parse/sync'
import { readFileSync } from 'fs'
import { config } from 'dotenv'

config()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface MemberRow {
  email: string
  full_name: string
  city: string
  membership_tier: string
}

async function importMembers(csvPath: string, dryRun: boolean = false) {
  try {
    const csvContent = readFileSync(csvPath, 'utf-8')
    const members: MemberRow[] = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    })

    console.log(`Found ${members.length} members to import`)
    if (dryRun) {
      console.log("DRY RUN - No changes will be made")
    }

    let successCount = 0
    let errorCount = 0

    for (const member of members) {
      try {
        if (dryRun) {
          console.log(`Would create: ${member.email} - ${member.full_name}`)
          continue
        }

        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: member.email,
          email_confirm: true,
          user_metadata: { full_name: member.full_name }
        })

        if (authError) throw authError

        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: member.email,
            full_name: member.full_name,
            city: member.city,
            role: 'member'
          })

        if (profileError) throw profileError

        // Create membership
        const { error: membershipError } = await supabase
          .from('memberships')
          .insert({
            user_id: authData.user.id,
            tier: member.membership_tier,
            status: 'active'
          })

        if (membershipError) throw membershipError

        successCount++
        console.log(`✓ Created: ${member.email}`)
      } catch (error) {
        errorCount++
        console.error(`✗ Error with ${member.email}:`, error)
      }
    }

    console.log(`\nImport complete: ${successCount} successful, ${errorCount} errors`)
  } catch (error) {
    console.error('Import failed:', error)
  }
}

// CLI usage
const args = process.argv.slice(2)
const csvPath = args[0]
const dryRun = args.includes('--dry-run')

if (!csvPath) {
  console.log('Usage: npm run import-members <csv-file> [--dry-run]')
  process.exit(1)
}

importMembers(csvPath, dryRun) */