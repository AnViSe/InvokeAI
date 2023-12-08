import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { useAppSelector } from 'app/store/storeHooks';
import IAIButton from 'common/components/IAIButton';
import IAIIconButton from 'common/components/IAIIconButton';
import { useSaveWorkflowAs } from 'features/workflowLibrary/hooks/useSaveWorkflowAs';
import { getWorkflowCopyName } from 'features/workflowLibrary/util/getWorkflowCopyName';
import { ChangeEvent, memo, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaClone } from 'react-icons/fa';

const SaveWorkflowAsButton = () => {
  const currentName = useAppSelector((state) => state.workflow.name);
  const { t } = useTranslation();
  const { saveWorkflowAs, isLoading } = useSaveWorkflowAs();
  const [name, setName] = useState(getWorkflowCopyName(currentName));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  const onOpenCallback = useCallback(() => {
    setName(getWorkflowCopyName(currentName));
    onOpen();
  }, [currentName, onOpen]);

  const onSave = useCallback(async () => {
    saveWorkflowAs({ name, onSuccess: onClose, onError: onClose });
  }, [name, onClose, saveWorkflowAs]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  return (
    <>
      <IAIIconButton
        icon={<FaClone />}
        onClick={onOpenCallback}
        isLoading={isLoading}
        tooltip={t('workflows.saveWorkflowAs')}
        aria-label={t('workflows.saveWorkflowAs')}
      />
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={inputRef}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t('workflows.saveWorkflowAs')}
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl>
                <FormLabel>{t('workflows.workflowName')}</FormLabel>
                <Input
                  ref={inputRef}
                  value={name}
                  onChange={onChange}
                  placeholder={t('workflows.workflowName')}
                />
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <IAIButton onClick={onClose}>{t('common.cancel')}</IAIButton>
              <IAIButton colorScheme="accent" onClick={onSave} ml={3}>
                {t('common.saveAs')}
              </IAIButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default memo(SaveWorkflowAsButton);
