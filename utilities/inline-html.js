
module.exports = {
    forgotPassword: (data) => {
        return`<div style="background-color:#ffffff;margin:0!important;padding:0!important">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tbody>
        <tr>
            <td bgcolor="" align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px">
                    <tbody>
                    <tr>
                        <td align="center" valign="top" style="padding:40px 10px 10px 30px">
                            <a href="${data.site}" target="_blank">
                                <img label="logo" alt="${data.app_name}" src="${data.logo}" width="128" height="128">
                            </a>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#ffffff" align="center" style="padding:0px 10px 0px 10px">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px">
                    <tbody>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding:10px 30px 10px 30px;color:#293042;font-family:'Roboto',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:27px">
                            <u></u>
                            <a style="text-decoration:none;color:#293042;font-family:'Roboto',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:27px">
                                Dear ${data.name}.
                                <br>
                                If you want to reset your password, check this out.
                                <u></u>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tbody>
                                <tr>
                                    <td bgcolor="#ffffff" align="left" style="padding:20px 30px 30px 30px">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                            <tbody>
                                            <tr>
                                                <td align="left" style="border-radius:3px" bgcolor="#fbcd36">
                                                    <a href="${data.link}" style="font-size:16px;font-family:Helvetica,Arial,sans-serif;color:black;text-decoration:none;color:black;text-decoration:none;padding:15px 25px;border-radius:2px;border:1px solid #fbcd36;display:inline-block" target="_blank">
                                                        <u></u>Reset Password<u></u>
                                                    </a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding:0px 30px 40px 30px;color:#293042;font-family:'Roboto',Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:27px">
                            <u></u>Source: <b>${data.source}</b><u></u>
                            <br>
                            <br>
                            <u></u>Thanks<br>${data.app_name}<u></u>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="" align="center" style="padding:0px 10px 0px 10px">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px">
                    <tbody>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" align="left" style="padding:0px 30px 30px 30px;color:#aeb4bf;font-family:'Roboto',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;line-height:16px">
                            <p style="margin:0;border-top:1px solid #ebedf2;padding:40px 0px 0 0px">
                                <u></u>
                                © ${data.year} ${data.app_name}
                                <u></u>
                            </p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        </tbody>
    </table>
</div>`;
    },
};
