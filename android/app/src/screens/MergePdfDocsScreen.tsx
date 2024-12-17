import React from 'react';
import { Alert, Button, NativeModules, View } from 'react-native';
import { DocumentPDFConfiguration } from 'react-native-pspdfkit';

import { BaseExampleAutoHidingHeaderComponent } from '../Global/BaseExampleAutoHidingHeaderComponent';
import { Droid_license, pspdfkitColor, pdfDocument1Path, pdfDocument2Path, writableMergedPdfDocumentPath } from '../main/Global/Constants';

export default class MergePdfDocsScreen extends BaseExampleAutoHidingHeaderComponent {
  constructor(props: any) {
    super(props);
  }

  override render() {
    return (
      <View style={styles.flex}>
            <Button
              onPress={async () => {

                try {

                    const PSPDFKit = NativeModules.PSPDFKit;
                    PSPDFKit.setLicenseKey(Droid_license);

                    const Processor = NativeModules.RNProcessor;
                    
                    let fileName = 'PDFFromDocuments';
                    let outputFile = null;
                    // For images from assets, you'll need to provide the global path for images in iOS.
                    // In case you took image from the camera, you can use local path, instead.
                    // Remote images from web URL will need to be downloaded first and then used as local path.
                    // let globalPath = getMainBundlePath(exampleDocumentPath.toString());
                    try {
                        outputFile = writableMergedPdfDocumentPath;
                    } catch (e: any) {
                        console.log(e.message, e.code);
                        Alert.alert('PSPDFKit', e.message);
                    }

                    const configuration: DocumentPDFConfiguration = {
                        filePath: outputFile!,
                        documents: [
                        {
                            documentPath:pdfDocument1Path,
                            pageIndex: 0,
                        },
                        {
                            documentPath:pdfDocument2Path,
                            pageIndex: 0,
                        },
                        ],
                        override: true,
                    };

                    try {
                        const { fileURL } = await Processor.generatePDFFromDocuments(configuration);
                        // Do something with the new file by accessing it from the `fileURL` path.
                    } catch (error) {
                        console.log(error);
                    }

                } catch (error) {
                    console.error("Error fetching or setting annotations:", error);
                }
              }}
              title="Merge Pdfs"
              accessibilityLabel="Merge Pdfs"
            />
          </View>
    );
  }
}

const styles = {
  flex: { flex: 1 },
  marginLeft: { marginLeft: 10 },
  wrapperView: {
    flexDirection: 'row' as 'row',
    height: 60,
    alignItems: 'center' as 'center',
    padding: 10,
  },
  pdfColor: { flex: 1, color: pspdfkitColor },
};