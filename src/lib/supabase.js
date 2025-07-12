import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Validate environment variables
if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder')) {
  console.warn('⚠️ Supabase URL not configured. Please set VITE_SUPABASE_URL in your .env file')
}

if (!import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY.includes('placeholder')) {
  console.warn('⚠️ Supabase Anon Key not configured. Please set VITE_SUPABASE_ANON_KEY in your .env file')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signUp = async (email, password, userData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Database helpers
export const createOrder = async (orderData) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
  return { data, error }
}

export const getUserOrders = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const createPaymentIntent = async (amount, orderId) => {
  const { data, error } = await supabase.functions.invoke('create-payment-intent', {
    body: { amount, orderId }
  })
  return { data, error }
}