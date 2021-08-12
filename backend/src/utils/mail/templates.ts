import { User } from '../../interfaces/user';

export const verifyEmailTemplate = (
  user: User,
  confirmationCode: string
): string => {
  return `
  <!DOCTYPE html>
    <html
    lang="en"
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    >
    <head>
        <title>Welcome to NerdHub Kenya</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
        #outlook a {
            padding: 0;
        }

        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        .button:hover,
        .button:focus {
            border: 2px solid #0de80e;
            background-color: red;
        }

        p {
            display: block;
            margin: 13px 0;
        }
        </style>

        <style type="text/css">
        @media only screen and (min-width: 480px) {
            .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
            }
        }
        </style>
        <style type="text/css">
        @media only screen and (max-width: 480px) {
            table.mj-full-width-mobile {
            width: 100% !important;
            }

            td.mj-full-width-mobile {
            width: auto !important;
            }
        }
        </style>
        <style type="text/css">
        a,
        span,
        td,
        th {
            -webkit-font-smoothing: antialiased !important;
            -moz-osx-font-smoothing: grayscale !important;
        }
        </style>
    </head>

    <body style="background-color: #000">
        <div
        style="
            display: none;
            font-size: 1px;
            color: #fff;
            line-height: 1px;
            max-height: 0px;
            max-width: 0px;
            opacity: 0;
            overflow: hidden;
        "
        >
        Preview - Welcome to NerdHub Kenya
        </div>
        <div style="background-color: #000">
        <div style="margin: 0px auto; max-width: 600px">
            <table
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="width: 100%"
            >
            <tbody>
                <tr>
                <td
                    style="
                    direction: ltr;
                    font-size: 0px;
                    padding: 20px 0;
                    padding-bottom: 0px;
                    text-align: center;
                    "
                >
                    <div
                    class="mj-column-per-100 mj-outlook-group-fix"
                    style="
                        font-size: 0px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                    "
                    >
                    <table
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="vertical-align: top"
                        width="100%"
                    >
                        <tbody>
                        <tr>
                            <td
                            align="left"
                            style="
                                font-size: 0px;
                                padding: 10px 25px;
                                word-break: break-word;
                            "
                            ></td>
                        </tr>
                        <tr>
                            <td
                            align="left"
                            style="
                                font-size: 0px;
                                padding: 10px 25px;
                                word-break: break-word;
                            "
                            >
                            <div
                                style="
                                font-family: Helvetica, Arial, sans-serif;
                                font-size: 18px;
                                font-weight: 400;
                                line-height: 24px;
                                text-align: left;
                                color: #0de80e;
                                "
                            >
                                <h1
                                style="
                                    margin: 0;
                                    font-size: 24px;
                                    line-height: normal;
                                    font-weight: bold;
                                "
                                >
                                Welcome to <br />
                                NerdHub Kenya!
                                </h1>
                            </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </td>
                </tr>
            </tbody>
            </table>
        </div>

        <div style="margin: 0px auto; max-width: 600px">
            <table
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="width: 100%"
            >
            <tbody>
                <tr>
                <td
                    style="
                    direction: ltr;
                    font-size: 0px;
                    padding: 20px 0;
                    text-align: center;
                    "
                >
                    <div
                    class="mj-column-per-100 mj-outlook-group-fix"
                    style="
                        font-size: 0px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                    "
                    >
                    <table
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="vertical-align: top"
                        width="100%"
                    >
                        <tbody>
                        <tr>
                            <td
                            style="
                                font-size: 0px;
                                padding: 10px 25px;
                                word-break: break-word;
                            "
                            >
                            <div
                                style="
                                font-family: Helvetica, Arial, sans-serif;
                                font-size: 18px;
                                font-weight: 400;
                                line-height: 24px;
                                text-align: left;
                                color: #fff;
                                "
                            >
                                We have approved your request ${user.firstName} and we are really
                                excited to welcome you.
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td
                            style="
                                font-size: 0px;
                                padding: 10px 25px;
                                word-break: break-word;
                            "
                            >
                            <div
                                style="
                                font-family: Helvetica, Arial, sans-serif;
                                font-size: 18px;
                                font-weight: 400;
                                line-height: 24px;
                                text-align: left;
                                color: #fff;
                                "
                            >
                                Click on the link below to complete your
                                registration and get started!
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td
                            vertical-align="middle"
                            style="
                                font-size: 0px;
                                padding: 10px 25px;
                                word-break: break-word;
                            "
                            >
                            <table
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="border-collapse: separate; line-height: 100%"
                            >
                                <tbody>
                                <tr>
                                    <td
                                    role="presentation"
                                    style="
                                        border: none;
                                        border-radius: 30px;
                                        cursor: auto;
                                        mso-padding-alt: 10px 25px;
                                        background: #2e58ff;
                                    "
                                    valign="middle"
                                    >
                                    <a
                                        href="http://localhost:3000/register/confirm/${confirmationCode}"
                                        class="button"
                                        style="
                                        display: inline-block;
                                        background: #000;
                                        color: #0de80e;
                                        border: 1px solid #0de80e;
                                        font-family: Helvetica, Arial, sans-serif;
                                        font-size: 14px;
                                        font-weight: bold;
                                        line-height: 30px;
                                        margin: 0;
                                        text-decoration: none;
                                        text-transform: uppercase;
                                        padding: 10px 25px;
                                        mso-padding-alt: 0px;
                                        "
                                        target="_blank"
                                    >
                                        Complete registration
                                    </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </td>
                        </tr>
                        <tr>
                            <td
                            style="
                                font-size: 0px;
                                padding: 10px 25px;
                                word-break: break-word;
                            "
                            >
                            <div
                                style="
                                font-family: Helvetica, Arial, sans-serif;
                                font-size: 18px;
                                font-weight: 400;
                                line-height: 24px;
                                text-align: left;
                                color: #fff;
                                "
                            >
                                If you need any help, don’t hesitate to reach out to
                                us at
                                <a
                                href="#"
                                style="color: #0de80e; text-decoration: none"
                                >nerdhubkenya@gmail.com</a
                                >!
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td
                            style="
                                font-size: 0px;
                                padding: 10px 25px;
                                word-break: break-word;
                            "
                            >
                            <div
                                style="
                                font-family: Helvetica, Arial, sans-serif;
                                font-size: 18px;
                                font-weight: bold;
                                line-height: 24px;
                                text-align: left;
                                color: #fff;
                                "
                            >
                                NerdHub Kenya
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td
                            style="
                                font-size: 0px;
                                padding: 10px 25px;
                                word-break: break-word;
                            "
                            ></td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
        <div style="margin: 0px auto; max-width: 600px">
            <table
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="width: 100%"
            >
            <tbody>
                <tr>
                <td
                    style="
                    direction: ltr;
                    font-size: 0px;
                    padding: 20px 0;
                    padding-top: 0;
                    text-align: center;
                    "
                >
                    <div
                    class="mj-column-per-100 mj-outlook-group-fix"
                    style="
                        font-size: 0px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                    "
                    >
                    <table
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="vertical-align: top"
                        width="100%"
                    >
                        <tbody>
                        <tr>
                            <td
                            style="
                                font-size: 0px;
                                padding: 10px 25px;
                                word-break: break-word;
                            "
                            >
                            <p
                                style="
                                border-top: dashed 1px lightgrey;
                                font-size: 1px;
                                margin: 0px auto;
                                width: 100%;
                                "
                            ></p>
                            </td>
                        </tr>
                        <tr>
                            <td
                            style="
                                font-size: 0px;
                                padding: 10px 25px;
                                word-break: break-word;
                            "
                            >
                            <div
                                style="
                                font-family: Helvetica, Arial, sans-serif;
                                font-size: 18px;
                                font-weight: 400;
                                line-height: 24px;
                                text-align: left;
                                color: #fff;
                                "
                            >
                                123 Medalling Jr., Suite 100, Parrot Park, CA
                                12345<br />
                                © 2020 [Coded Mails] Inc.
                            </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </td>
                </tr>
            </tbody>
            </table>
        </div>

        <div style="margin: 0px auto; max-width: 600px">
            <table
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="width: 100%"
            >
            <tbody>
                <tr>
                <td
                    style="
                    direction: ltr;
                    font-size: 0px;
                    padding: 20px 0;
                    text-align: center;
                    "
                >
                    <div
                    class="mj-column-per-100 mj-outlook-group-fix"
                    style="
                        font-size: 0px;
                        text-align: left;
                        direction: ltr;
                        display: inline-block;
                        vertical-align: top;
                        width: 100%;
                    "
                    >
                    <table
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="vertical-align: top"
                        width="100%"
                    >
                        <tbody>
                        <tr>
                            <td style="font-size: 0px; word-break: break-word">
                            >
                            <div style="height: 1px"></div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
    </body>
    </html>
`;
};
