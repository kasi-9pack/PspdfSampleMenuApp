import React, { useEffect } from 'react';
import PSPDFKitView from 'react-native-pspdfkit';
import { NativeModules } from 'react-native';
import { BackHandler, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PdfViewerScreen() {
  
    const navigation = useNavigation(); // Get the navigation prop

    const PSPDFKit = NativeModules.PSPDFKit;
    PSPDFKit.setLicenseKey(Droid_license); //('YmaGOsVsIbDLCNlPypviQmAYakLHoq9O-jOFhnhEtOdkdTS3gME6tId9TGuEsX5kG1YBiFpSZaJQHNd6pFT7QDPNSP2ovSeJWjpFluyVp3nj6nflpgtvDyju83iTeGzixJkl_LW2kg1wTYiY4Z4Df_BHYoO9Gt_Y2cKSKOO9HEc--Ik2Be1Al1htZtj261mBDeToxq_JV3cAjnAbbt1usbN-FjVAd2tFZcLlVMpiZiJf0AhLfltI0eLsN1EqrfEF0bDmIAFGTjtXJs9L6Su5m0bcx51QQP4g8bl5VitdClmu3Cv-NSrOuhKxlYktqPW1FhnpvKSHmxWjNthac0t46uQbGNo0kyEReHqGrtBz0vaks35PApGvDKRzsO2u1JXkEIzNYQWmsWhap9dsUTJ-4NJojuJue765gSB2gVdZ6Fzq2GyybOwAQwtosMkfYgV--2kCsqkNmCyFNGtOPltCiZGrjsf7VTbPBZmJlJtk_vjbr7W9X3bNr2ZksdqWvuteJy0lH72QKYVqrAiJZFUTOv2xZ4qJ6WxAl1XwcEljjVIKazjTbVYLmc-Y_7wejuhZpUdzFqUKhSlnu37ICa7Kxy0B_vLZYQXNA3hVLBJNsF4MsYQO16WWIJ_uTe5Zt97TpTY6Lo-vRs5EEdff-VeP72yOftikPBjifAJci3rqsp8apRPiVGbCl88xpB818DdnHtg7GG9e_pPeDcHJLP2S-kRfz_wK5kA6kdrbmPp0E-I='); // Or your valid license keys using `setLicenseKeys`.
  
    const DOCUMENT = 'file:///android_asset/sample.pdf';
  
    const pdfRef = React.createRef(); // Removed TypeScript type annotation
    
    // Handle back button press to go to HomeScreen
    useEffect(() => {
      const backAction = () => {
        navigation.navigate('Home');
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, [navigation]);
  
    return (
        <PSPDFKitView
          document={DOCUMENT}
          configuration={{
            showThumbnailBar: 'scrollable',
            pageTransition: 'scrollContinuous',
            scrollDirection: 'vertical',
          }}
          ref={pdfRef}
          fragmentTag="PDF1"
          style={{ flex: 1 }}
        />
    );
  }