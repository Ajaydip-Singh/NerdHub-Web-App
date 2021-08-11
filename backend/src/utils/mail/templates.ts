import { User } from '../../interfaces/user';

export const verifyEmailTemplate = (user: User): string => {
  return `<!DOCTYPE html>
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

    <script
      src="https://kit.fontawesome.com/440f42f698.js"
      crossorigin="anonymous"
    ></script>

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
      }

      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }

      p {
        display: block;
        margin: 13px 0;
      }
    </style>

    <link
      href="https://fonts.googleapis.com/css?family=Muli:300,400,700"
      rel="stylesheet"
      type="text/css"
    />
    <style type="text/css">
      @import url(https://fonts.googleapis.com/css?family=Muli:300,400,700);
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
        overflow: hidden;
        "
    >
      Preview - Welcome to Nerdhub Kenya
    </div>
    <div style="background-color: #0de80e">
      <div
        style="
          background: #000;
          background-color: #fff;
          margin: 0px auto;
          max-width: 600px;
        "
      >
        <table
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background: #000; background-color: #000; width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 0px;
                  text-align: center;
                "
              >

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
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: Muli, Arial, sans-serif;
                                        font-size: 20px;
                                        font-weight: 400;
                                        line-height: 30px;
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
                                        Hi ${user.firstName}, Welcome to Nerdhub Kenya
                                      </h1>
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
                                    <p
                                      style="
                                        border-top: solid 1px #f4f5fb;
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
                                        font-family: Muli, Arial, sans-serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        line-height: 20px;
                                        text-align: left;
                                        color: #fff;
                                      "
                                    >
                                      Here are the next steps to get you
                                      started:
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
                                        font-family: Muli, Arial, sans-serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        line-height: 20px;
                                        text-align: left;
                                        color: #0de80e;
                                      "
                                    >
                                      <h2
                                        style="
                                          margin: 0;
                                          font-size: 24px;
                                          line-height: normal;
                                          font-weight: bold;
                                        "
                                      >
                                        1. Verify Your Account
                                      </h2>
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
                                        font-family: Muli, Arial, sans-serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        line-height: 20px;
                                        text-align: left;
                                        color: #fff;
                                      "
                                    >
                                      To ensure you're legitimate and not a fake
                                      person, please verify your account by
                                      clicking the button below.
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
                                      style="
                                        border-collapse: separate;
                                        line-height: 100%;
                                      "
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            role="presentation"
                                            style="
                                              border: 2px solid #0de80e;
                                              border-radius: 3px;
                                              cursor: auto;
                                              mso-padding-alt: 8px 16px;
                                              background: #000;
                                            "
                                            valign="middle"
                                          >
                                            <a
                                              href="[LINK]"
                                              style="
                                                display: inline-block;
                                                background: #000;
                                                color: #0de80e;
                                                font-family: Muli, Arial,
                                                  sans-serif;
                                                font-size: 13px;
                                                font-weight: normal;
                                                line-height: 30px;
                                                margin: 0;
                                                text-decoration: none;
                                                text-transform: none;
                                                padding: 8px 16px;
                                                mso-padding-alt: 0px;
                                                border-radius: 3px;
                                              "
                                              target="_blank"
                                            >
                                              Verify my account
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
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
                            padding: 0px;
                            text-align: center;
                          "
                        >

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
                            padding-top: 0px;
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
                                        font-family: Muli, Arial, sans-serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        line-height: 20px;
                                        text-align: left;
                                        color: #0de80e;
                                      "
                                    >
                                      <h2
                                        style="
                                          margin: 0;
                                          font-size: 24px;
                                          line-height: normal;
                                          font-weight: bold;
                                        "
                                      >
                                        2. Follow us
                                      </h2>
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
  
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="float: none; display: inline-table"
                                    >
                                      <tbody>
                                        <tr>
                                          <td style="padding: 4px">
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style="
                                                border-radius: 3px;
                                                width: 32px;
                                              "
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="
                                                      font-size: 0;
                                                      height: 32px;
                                                      vertical-align: middle;
                                                      width: 32px;
                                                    "
                                                  >
                                                    <a
                                                      href="#"
                                                      target="_blank"
                                                      style="
                                                        color: #2e58ff;
                                                        text-decoration: none;
                                                      "
                                                    >
                                                              <i class="fab fa-twitter-square fa-2x fa-fw"></i>
                          
                                                    </a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>

                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="float: none; display: inline-table"
                                    >
                                      <tbody>
                                        <tr>
                                          <td style="padding: 4px">
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style="
                                                border-radius: 3px;
                                                width: 32px;
                                              "
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="
                                                      font-size: 0;
                                                      height: 32px;
                                                      vertical-align: middle;
                                                      width: 32px;
                                                    "
                                                  >
                                                    <a
                                                      href="#"
                                                      target="_blank"
                                                      style="
                                                        color: #2e58ff;
                                                        text-decoration: none;
                                                      "
                                                    >
                                                              <i class="fab fa-facebook fa-2x fa-fw"></i>
                                                      />
                                                    </a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
    
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="float: none; display: inline-table"
                                    >
                                      <tbody>
                                        <tr>
                                          <td style="padding: 4px">
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style="
                                                border-radius: 3px;
                                                width: 32px;
                                              "
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="
                                                      font-size: 0;
                                                      height: 32px;
                                                      vertical-align: middle;
                                                      width: 32px;
                                                    "
                                                  >
                                                    <a
                                                      href="#"
                                                      target="_blank"
                                                      style="
                                                        color: #2e58ff;
                                                        text-decoration: none;
                                                      "
                                                    >
                                                              <i class="fab fa-instagram fa-2x fa-fw"></i>
                                            
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
                                  <td
                                    style="
                                      font-size: 0px;
                                      padding: 10px 25px;
                                      word-break: break-word;
                                    "
                                  >
                                    <div
                                      style="
                                        font-family: Muli, Arial, sans-serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        line-height: 20px;
                                        text-align: left;
                                        color: #fff;
                                      "
                                    >
                                      Thank you and welcome onboard :)
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
>
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
                              font-family: Muli, Arial, sans-serif;
                              font-size: 14px;
                              font-weight: 400;
                              line-height: 20px;
                              text-align: center;
                              color: #fff;
                            "
                          >
                            © 2021 [Nerdhub Kenya], Nairobi, Kenya.
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

  </body>
</html>
`;
};
