import { ArrowLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button, ButtonSkeleton } from '../ui/button'

type BackButtonProps = Omit<
	React.ComponentProps<typeof Button>,
	'render' | 'title' | 'nativeButton' | 'children'
> & {
	to: React.ComponentProps<typeof Link>['to']
	params?: Record<string, string>
}

export function BackButton({ to, params, ...props }: BackButtonProps) {
	return (
		<Button
			size="icon"
			title="Voltar"
			variant="ghost"
			nativeButton={false}
			render={
				<Link title="Voltar" to={to} params={params as any}>
					<ArrowLeft aria-hidden />
				</Link>
			}
			{...props}
		/>
	)
}

export function BackButtonSkeleton() {
	return <ButtonSkeleton size="icon" />
}
