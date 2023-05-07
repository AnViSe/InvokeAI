import { Box, Flex } from '@chakra-ui/react';
import { useAppSelector } from 'app/store/storeHooks';
import { memo } from 'react';
import PinParametersPanelButton from '../../PinParametersPanelButton';
import { RootState } from 'app/store/store';
import Scrollable from '../../common/Scrollable';
import ParametersSlide from '../../common/ParametersSlide';
import UnifiedCanvasParameters from './UnifiedCanvasParameters';
import UnifiedCanvasContentBeta from './UnifiedCanvasBeta/UnifiedCanvasContentBeta';
import UnifiedCanvasContent from './UnifiedCanvasContent';

const CanvasWorkspace = () => {
  const shouldPinParametersPanel = useAppSelector(
    (state: RootState) => state.ui.shouldPinParametersPanel
  );

  const shouldUseCanvasBetaLayout = useAppSelector(
    (state: RootState) => state.ui.shouldUseCanvasBetaLayout
  );

  return shouldUseCanvasBetaLayout ? (
    <UnifiedCanvasContentBeta />
  ) : (
    <UnifiedCanvasContent />
  );

  return (
    <Flex
      flexDirection={{ base: 'column-reverse', xl: 'row' }}
      w="full"
      h="full"
      gap={4}
    >
      {/* {shouldPinParametersPanel ? (
        <Box width="28rem" flexShrink={0} position="relative">
          <Scrollable>
            <UnifiedCanvasParameters />
          </Scrollable>
          <PinParametersPanelButton
            sx={{ position: 'absolute', top: 0, insetInlineEnd: 0 }}
          />
        </Box>
      ) : (
        <ParametersSlide>
          <UnifiedCanvasParameters />
        </ParametersSlide>
      )} */}
      {shouldUseCanvasBetaLayout ? (
        <UnifiedCanvasContentBeta />
      ) : (
        <UnifiedCanvasContent />
      )}
    </Flex>
  );
};

export default memo(CanvasWorkspace);
