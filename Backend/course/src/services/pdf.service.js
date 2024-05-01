import pdfCreator from 'pdf-creator-node';
import {orderPdf} from "./pdf-templates/orderPdf.js";
import {CustomError} from "../middlewares/errorHandler.middleware.js";

export const renderPDF = async (data) => {
    const html = orderPdf(data);

    const options = {
        format: 'A4',
        orientation: 'portrait',
        border: '10mm',
        childProcessOptions: {
            env: {
                OPENSSL_CONF: '/dev/null',
            },
        }
    };
    
    const document = {
        html: html,
        data: data,
        path: `.src/uploads/pdf/${data.orderId}.pdf`
    };
    
    try {
        const res = await pdfCreator.create(document, options);
        console.log('PDF created: ', res);
        return res;
    }catch (error){
        console.log('Error creating PDF: ', error)
        throw new CustomError('Error creating PDF', 400);
    } 
}