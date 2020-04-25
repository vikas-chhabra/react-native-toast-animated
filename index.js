import Toast from './src/toast';
import ErrorBoundary from './src/ErrorBoundary';


export default function ToastApp(){
    return(
        <ErrorBoundary>
            <Toast/>
        </ErrorBoundary>
    );
}