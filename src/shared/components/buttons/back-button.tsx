import { ArrowLeft } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'

type BackButtonProps = Omit<
	React.ComponentProps<typeof Button>,
	'render' | 'title' | 'nativeButton' | 'children'
> & {
	to: React.ComponentProps<typeof Link>['to']
}

export function BackButton({ to, ...props }: BackButtonProps) {
	return (
		<Button
			title="Voltar"
			variant="ghost"
			nativeButton={false}
			render={
				<Link title="Voltar" to={to}>
					<ArrowLeft aria-hidden />
				</Link>
			}
			{...props}
		/>
	)
}
