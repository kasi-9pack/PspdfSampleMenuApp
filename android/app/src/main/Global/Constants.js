// Document names
import { Platform } from 'react-native';
import fileSystem from 'react-native-fs';

export const Droid_license = 'k8m-fDhC74EI8SLzcJ7cHe6B6qDQMCS-2DzEbDESXMb3NO_sP9pNNDQiKJA2eeKEne4431xH06UoB_f9tcLyZ7aEgBscqLLa35-VuwyUA3tsfeZ2TmeQHXJnyOt49pJ3iaLNLuthl415UeKZimCLszVD8EvlFAZUo7Cqi5b67RRpYd-h18qiCXHnITeIZbg7n6h26TeMpuPqZMWwjlrDOIczSWY4BlrBbQaO1At1GR4FNnCqqGWcz67Y-Yenpk01XsGN_yBjTIUFNLglHR1crGKyRLYvOVkQxW080NR4z1vd1q2f_6p24Oek2Gv9APLBmti77xrA177DiLTew-UuogMRSvjyA3zBl_b6d0eJfloqdH4D_u8d9SE4zPqsVm4FKoOJXs58RYoJfG6aBkulj4k7opXfq5k0PGZalKh7iscoN3k47X5jLpgeLsFEsOysQgt7oIZjIAgCuKLWPBt3FVUudPjuivdzUYrLjkijG8nRQDtXWzNcQPSk7USPd4pVG1s3FKNyljiBMbcLjZdkbFITbTqllbcpsyyN5GTmlBqeTj-zx9FkD70sEmuH1g_dFfzu0ao7AiY-yPOMA3OTev_fpS_Rb0Vm5owrG05V2lFw8y-zoPimQiyh3ynY9De4YPVRZ3PM1NQoDCi3WHIclroAQgD0YFs36l-kip5twUM=';

export const pspdfkitColor = '#267AD4';

const tiffImageName = 'PSPDFKit_Image_Example.tiff';
export const formDocumentName = 'Gardiner_Sample_FormFill.pdf'; // ;'Form_example.pdf';
const measurementsName = 'Measurements.pdf';

export const exampleImage = 'PSPDFKit_Image_Example.jpg';
export const exampleImagePath = 'file:///android_asset/' + exampleImage;

// Document paths
export const formDocumentPath = 'file:///android_asset/' + formDocumentName;


export const tiffImagePath = 'file:///android_asset/' + tiffImageName;

export const measurementsDocument = 'file:///android_asset/' + measurementsName;


export const writableFormDocumentPath =
  Platform.OS === 'ios'
    ? fileSystem.DocumentDirectoryPath + '/' + formDocumentName
    : 'file://' + fileSystem.DocumentDirectoryPath + '/' + formDocumentName;

export const pdfDocument1Path = 'file:///android_asset/Gardiner_Pdf_1.pdf';
export const pdfDocument2Path = 'file:///android_asset/TitanInvoice_pdf_2.pdf';

export const mergedPdfDocumentName = 'MergedPdf.pdf'; //'sample.pdf'; //'PSPDFKit_Quickstart_Guide.pdf';
export const writableMergedPdfDocumentPath = fileSystem.DocumentDirectoryPath + '/' + mergedPdfDocumentName;

export const writableFlatternPdfDocumentPath = fileSystem.DocumentDirectoryPath + '/FlatternDoc.pdf';

export const writableFormPdfDocumentPath = fileSystem.DocumentDirectoryPath + '/FormPdfDoc.pdf';

export const exampleDocumentName = 'Gardiner_Sample01.pdf'; //'sample.pdf'; //'PSPDFKit_Quickstart_Guide.pdf';
export const exampleDocumentPath = 'file:///android_asset/' + exampleDocumentName;
export const writableDocumentPath = 'file://' + fileSystem.DocumentDirectoryPath + '/' + exampleDocumentName;

export const formTypeDocumentName = 'client_form_02.pdf'; //'Invoice_ServiceTitan.pdf'; //'sample.pdf'; //'PSPDFKit_Quickstart_Guide.pdf';
export const writableformTypeDocumentPath = 'file://' + fileSystem.DocumentDirectoryPath + '/' + formTypeDocumentName;


export const sampleDoc01 = 'file:///android_asset/client_form_01.pdf';
export const sampleDoc02 = 'file:///android_asset/client_form_02.pdf';
export const writable9PackSampleDocName = '9pack_sample_form_updated.pdf';
export const writable9PackSampleDocPath = fileSystem.DocumentDirectoryPath + '/' + writable9PackSampleDocName;

export const writable9PackSampleFinalDocName = '9pack_sample_form_final.pdf';
export const writable9PackSampleFinalDocPath = fileSystem.DocumentDirectoryPath + '/' + writable9PackSampleFinalDocName;
