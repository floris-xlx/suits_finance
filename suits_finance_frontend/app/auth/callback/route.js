import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request) {
  try {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')

    if (code) {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
      await supabase.auth.exchangeCodeForSession(code)
    }

    return NextResponse.redirect('https://app.suits.finance/dashboard')
  } catch (error) {
    console.error('Error during authentication callback:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
