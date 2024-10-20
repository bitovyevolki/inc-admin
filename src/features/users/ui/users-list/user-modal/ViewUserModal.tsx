import type { FC, ReactNode } from 'react'

import { CloseOutlineIcon } from '@/src/shared/assets/icons/close-outline'
import { Button } from '@bitovyevolki/ui-kit-int'
import { Close, Content, Overlay, Portal, Root } from '@radix-ui/react-dialog'

import s from './ViewUserModal.module.scss'

export type ViewUserModalProps = {
  children: ReactNode
  isOpen: boolean
  onOpenChange: (value: boolean) => void
}

export const ViewUserModal: FC<ViewUserModalProps> = ({ children, isOpen, onOpenChange }) => {
  return (
    <Root onOpenChange={onOpenChange} open={isOpen}>
      <Portal>
        <div className={s.overlay}>
          <Content className={s.contentWrapper}>
            <Close asChild>
              <Button
                className={s.closeButton}
                onClick={() => onOpenChange(false)}
                variant={'ghost'}
              >
                <CloseOutlineIcon height={24} width={24} />
              </Button>
            </Close>
            {children}
          </Content>
        </div>
      </Portal>
    </Root>
  )
}
