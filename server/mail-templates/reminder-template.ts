const reminderTemplate = function (message: string) {
    const html = `
        <!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>email</title>
                <style>
                    @font-face {
                        font-family: 'ere';
                        font-style: normal;
                        font-weight: 400;
                        src: local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v7/zhcz-_WihjSQC0oHJ9TCYL3hpw3pgy2gAi-Ip7WPMi0.woff) format('woff');
                    }
        
                    body {
                        margin-left: 0px;
                        margin-top: 0px;
                        margin-right: 0px;
                        margin-bottom: 0px;
                    }
                </style>
            </head>
            <body style=" background-image: url(https://bmsstatic.adjarabetarena.com/html/BMS/html5/adjarabetarena/email/bg.png ); background-repeat: repeat; ">
                <div style="display:none;font-size:1px;color:#fff;line-height:1px; max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;"> adjarabetarena.com | შენი ვერიფიკაციის კოდია - </div>
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style=" background-image: url(https://bmsstatic.adjarabetarena.com/html/BMS/html5/adjarabetarena/email/bg.png ); background-repeat: repeat; ">
                    <tr>
                        <td align="center" width="100%">
                            <table style="color: #FFF" width="100%">
                                <tr>
                                    <td align="center" width="100%"><a target="_blank" href="#"><img src="https://bmsstatic.adjarabetarena.com/html/BMS/html5/adjarabetarena/email/logo.png" alt="" border="0" width="226" style="border:none; outline:none; padding:20px 0 20px 0;"></a></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" width="100%">
                            <div style="height:2px; width:95%; background-image: url('https://bmsstatic.adjarabetarena.com/html/BMS/html5/adjarabetarena/email/bgline2.jpg'); background-repeat:repeat-x;"></div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" width="100%" height="200">
                            <table width="100%">
                                <tr>
                                    <td align="center"><span></span><br><br><span style="font-family: Gotham, 'Helvetica Neue', Helvetica, Arial, 'sans-serif'; font-size:22px; color: #9b9b9b; font-weight: bold;">${message}</span></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" width="100%">
                            <div style="height:2px; width:95%; background-image: url('https://bmsstatic.adjarabetarena.com/html/BMS/html5/adjarabetarena/email/bgline2.jpg'); background-repeat:repeat-x;"></div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" width="100%">
                            <table width="100%" height="30" align="center" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center"><img src="https://bmsstatic.adjarabetarena.com/html/BMS/html5/adjarabetarena/email/cr4.jpg" alt="" border="0" width="321" height="10" style="display:block; border:none; outline:none; text-decoration:none;"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    `;

    const text = `${message}`;

    return {
        html: html,
        text: text,
    };
};

export default reminderTemplate;
