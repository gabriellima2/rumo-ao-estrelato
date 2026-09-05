import { createContext, use, useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from './client'
import type { PropsWithChildren } from 'react'
import type { Session, User } from '@supabase/supabase-js'

type AuthContextValue = {
	session: Session | null
	user: User | null
	isLoading: boolean
	signUp: (
		email: string,
		password: string,
	) => Promise<{ needsEmailConfirmation: boolean }>
	signIn: (email: string, password: string) => Promise<void>
	signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
	const context = use(AuthContext)

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}

	return context
}

export function AuthProvider({ children }: PropsWithChildren) {
	const queryClient = useQueryClient()
	const [session, setSession] = useState<Session | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		let isMounted = true

		supabase.auth.getSession().then(({ data }) => {
			if (!isMounted) return
			setSession(data.session)
			setIsLoading(false)
		})

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, nextSession) => {
			setSession(nextSession)
			setIsLoading(false)
			queryClient.clear()
		})

		return () => {
			isMounted = false
			subscription.unsubscribe()
		}
	}, [queryClient])

	const value = useMemo<AuthContextValue>(
		() => ({
			session,
			user: session?.user ?? null,
			isLoading,
			async signUp(email, password) {
				const { data, error } = await supabase.auth.signUp({ email, password })

				if (error) {
					throw error
				}

				return {
					needsEmailConfirmation: !data.session,
				}
			},
			async signIn(email, password) {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password,
				})

				if (error) {
					throw error
				}
			},
			async signOut() {
				const { error } = await supabase.auth.signOut()

				if (error) {
					throw error
				}
			},
		}),
		[session, isLoading],
	)

	return <AuthContext value={value}>{children}</AuthContext>
}
