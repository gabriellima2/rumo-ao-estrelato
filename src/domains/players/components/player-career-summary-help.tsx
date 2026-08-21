import { Info } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from '@/shared/components/ui/popover'

export function PlayerCareerSummaryHelp() {
	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button
						variant="ghost"
						size="icon-sm"
						className="text-muted-foreground"
						aria-label="Como estes dados são atualizados"
					>
						<Info />
					</Button>
				}
			/>
			<PopoverContent align="start" side="bottom" className="w-80">
				<PopoverHeader>
					<PopoverTitle>Atualização do resumo</PopoverTitle>
					<PopoverDescription className="leading-relaxed">
						Estas estatísticas e títulos são atualizados ao finalizar a
						temporada ou ao registrar uma transferência — quando você preenche os
						números e conquistas da passagem pelo clube na temporada. Registrar
						momentos da carreira não altera este resumo.
					</PopoverDescription>
				</PopoverHeader>
			</PopoverContent>
		</Popover>
	)
}
