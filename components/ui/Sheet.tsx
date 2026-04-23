import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView
} from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo } from 'react';
import { Text } from 'react-native';
import { colors } from '../../constants/colors';

interface SheetProps {
  children: React.ReactNode;
  snapPoints?: string[];
  title?: string;
  onClose?: () => void;
}

export const Sheet = React.forwardRef<BottomSheet, SheetProps>(
  ({ children, snapPoints = ['25%', '50%'], title, onClose }, ref) => {
    
    const memoSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    // Arka planı karartmak için backdrop bileşeni
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsAt={-1}
          appearsAt={0}
          opacity={0.4}
        />
      ),
      []
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1} // Başlangıçta kapalı
        snapPoints={memoSnapPoints}
        enablePanDownToClose
        onClose={onClose}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: colors.line, width: 40 }}
        backgroundStyle={{ backgroundColor: colors.paper }}
      >
        <BottomSheetView className="flex-1 px-5 pb-8">
          {title && (
            <Text className="text-lg font-outfit font-medium text-ink mb-4 text-center">
              {title}
            </Text>
          )}
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);