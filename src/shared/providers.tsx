import type { PropsWithChildren } from 'react'
import { AuthProvider } from '@/integrations/supabase/auth-context'

export function Providers({ children }: PropsWithChildren) {
	return <AuthProvider>{children}</AuthProvider>
}
