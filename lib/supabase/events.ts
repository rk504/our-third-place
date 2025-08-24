import { SupabaseClient } from '@supabase/supabase-js'

/**
 * Register user for an event using RPC function
 * @param client - Supabase client instance
 * @param eventId - UUID of the event to register for
 * @returns Promise with updated registration data
 */
export async function registerForEvent(client: SupabaseClient, eventId: string) {
  const { data: { user } } = await client.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  console.log('🔄 Calling register_for_event RPC:', { 
    p_event: eventId, 
    p_user: user.id,
    userEmail: user.email 
  })

  const { data, error } = await client.rpc('register_for_event', {
    p_event: eventId,
    p_user: user.id
  })
  
  console.log('✅ RPC register_for_event response:', { data, error })
  
  // Your RPC returns the registration record, let's log it
  if (data) {
    console.log('📝 Registration record created:', data)
  }
  
  if (error) {
    console.error('❌ RPC register_for_event error:', error)
    throw error
  }
  return data // updated row
}

/**
 * Deregister user from an event using RPC function
 * @param client - Supabase client instance
 * @param eventId - UUID of the event to deregister from
 * @returns Promise with updated registration data
 */
export async function deregisterFromEvent(client: SupabaseClient, eventId: string) {
  const { data: { user } } = await client.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }

  console.log('🚫 Calling deregister_from_event RPC:', { 
    p_event: eventId, 
    p_user: user.id,
    userEmail: user.email 
  })

  const { data, error } = await client.rpc('deregister_from_event', {
    p_event: eventId,
    p_user: user.id
  })
  
  console.log('✅ RPC deregister_from_event response:', { data, error })
  
  // Your RPC returns the updated registration record, let's log it
  if (data) {
    console.log('📝 Registration record updated to cancelled:', data)
  }
  
  if (error) {
    console.error('❌ RPC deregister_from_event error:', error)
    throw error
  }
  return data
}

/**
 * Check if user is registered for a specific event
 * @param client - Supabase client instance
 * @param eventId - UUID of the event to check
 * @returns Promise<boolean> - true if user is registered and confirmed
 */
export async function isUserRegisteredForEvent(client: SupabaseClient, eventId: string) {
  const { data: { user } } = await client.auth.getUser()
  
  if (!user) return false

  const { data, error } = await client
    .from('event_registrations')
    .select('id, status')
    .eq('event_id', eventId)
    .eq('user_id', user.id)
    .eq('status', 'registered')
    .single()

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    console.error('Error checking registration status:', error)
    return false
  }

  return !!data
}

/**
 * Get event registration count (only confirmed registrations)
 * @param client - Supabase client instance
 * @param eventId - UUID of the event
 * @returns Promise<number> - count of confirmed registrations
 */
export async function getEventRegistrationCount(client: SupabaseClient, eventId: string) {
  const { count, error } = await client
    .from('event_registrations')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', eventId)
    .eq('status', 'registered')

  if (error) {
    console.error('Error getting registration count:', error)
    return 0
  }

  return count || 0
}
