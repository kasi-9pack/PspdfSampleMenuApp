import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PdfViewerPage from './android/app/src/screens/PdfViewerScreen';
import ManualSavePage from './android/app/src/screens/PdfManualSaveScreen';
import HomeScreenPage from './android/app/src/screens/HomeScreen';
import ProgrammaticFormFillingScreenPage from './android/app/src/screens/ProgrammaticFormFillingScreen';
import DynamicFormFillingScreen from './android/app/src/screens/DynamicFormFillingScreen';
import MergePdfDocsScreen from './android/app/src/screens/MergePdfDocsScreen';
import FlatternPdfScreen from './android/app/src/screens/FlatternPdfScreen';
import DynamicLoadFillSavePdfScreen from './android/app/src/screens/DynamicLoadFillSavePdfScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreenPage} />
                <Stack.Screen name="PdfViewer" component={PdfViewerPage} />
                <Stack.Screen name="ManualSave" component={ManualSavePage} />
                <Stack.Screen name="ProgrammaticFormFilling" component={ProgrammaticFormFillingScreenPage} />
                <Stack.Screen name="DynamicFormFillingScreen" component={DynamicFormFillingScreen} />
                <Stack.Screen name="MergePdfDocs" component={MergePdfDocsScreen} />
                <Stack.Screen name="FlatternPdf" component={FlatternPdfScreen} />
                <Stack.Screen name="SampleScreen1" component={DynamicLoadFillSavePdfScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;