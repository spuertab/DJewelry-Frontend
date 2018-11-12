import { Component, OnInit } from '@angular/core';
import { TypographyService } from "./typography.service"
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-typography',
    templateUrl: './typography.component.html',
    styleUrls: ['./typography.component.scss'],
    providers: [TypographyService],
})
export class TypographyComponent implements OnInit {
    public object_url: string; 
    public signupForm: FormGroup;
    public confirmJewelry = false;
    constructor( public typographyService: TypographyService,
                 private fb: FormBuilder ) { }

    ngOnInit() {
        let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
        navbar.classList.remove('navbar-transparent');

        this.object_url = localStorage.getItem("object_img");

        this.signupForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            name: ['', [Validators.required]],
            phone: ['', [Validators.required]],
            ringmeasure: ['', [Validators.required]],
            ringweight: ['', [Validators.required]]
        });
    }

    onSendInfo() {
        console.log(this.signupForm.value);
        const objectEmail = {
            "Destinatario": "puerta1996@gmail.com",
            "Asunto": "Petición para la creación de joya (Anillo)",
            "Mensaje": `<html>
                <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>Denver CBD</title>
                </head>
                <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="
                background-color: #61bcb7;
                font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
                ">
                <br>
                <div style="
                    width:100%;
                    -webkit-text-size-adjust:none !important;
                    margin:0;
                    padding:0;
                    ">
                    <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
                        <tr>
                            <td align="center" valign="top">
                            <div id="template_header_image">
                                <p style="margin-top:0; font-family: Brush Script MT, Brush Script Std, cursive; font-size: 4em; margin-bottom: 10px; font-weight: bold; color: white">
                                    DJewelry
                                </p>
                            </div>
                            <table border="0" cellpadding="0" cellspacing="0" width="600" id="template_container" style="
                                box-shadow:0 0 0 1px #f3f3f3 !important;
                                border-radius:5px !important;
                                background-color: #ffffff;
                                border: 0px solid #000000;
                                border-radius:5px !important;
                                padding: 10px;
                                ">
                                <tr>
                                    <td align="center" valign="top">
                                        <!-- Body -->
                                        <table border="0" cellpadding="0" cellspacing="0" width="600" id="template_body">
                                        <tr>
                                            <td valign="top" style="
                                                border-radius:5px !important;
                                                font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
                                                ">
                                                <br />
                                                <!-- Content -->
                                                </p>
                                                <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                                    <tr>
                                                    <td valign="top">
                                                        <div style="
                                                            color: #6f6f6f;
                                                            font-size:15px;
                                                            font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
                                                            line-height:28px;
                                                            text-align:left;
                                                            ">
                                                            <p style="font-weight: bold">Petición para la creación de joya (Anillo)</p>
                                                            <p><strong>Nombre:</strong> ${this.signupForm.value.name}</p>
                                                            <p><strong>Teléfono:</strong> ${this.signupForm.value.phone}</p>
                                                            <p><strong>Email:</strong> ${this.signupForm.value.email}</p>
                                                        </div>
                                                    </td>
                                                    </tr>
                                                </table>
                                                <p>
                                                    <!-- End Content -->
                                            </td>
                                        </tr>
                                        </table>
                                        <!-- End Body -->
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top">
                                        <!-- Body -->
                                        <table border="0" cellpadding="0" cellspacing="0" width="600" id="template_body" style="background-color: #e3e3e3">
                                        <tr>
                                            <td valign="top" style="
                                                border-radius:5px !important;
                                                font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
                                                ">
                                                <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                                    <tr>
                                                    <td valign="top">
                                                        <div style="
                                                            color: #6f6f6f;
                                                            font-size:15px;
                                                            font-family: 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif;
                                                            line-height:28px;
                                                            text-align: center;
                                                            ">
                                                            <img _ngcontent-c2="" style="width: 150px; border-radius: 10px" src="${this.object_url}">
                                                            <p><strong>Medida de anillo:</strong> ${this.signupForm.value.ringmeasure}</p>
                                                            <p><strong>Peso del anillo:</strong> ${this.signupForm.value.ringweight}</p>
                                                        </div>
                                                    </td>
                                                    </tr>
                                                </table>
                                                <p>
                                                    <!-- End Content -->
                                            </td>
                                        </tr>
                                        </table>
                                        <!-- End Body -->
                                    </td>
                                </tr>
                            </table>
                            </td>
                        </tr>
                    </table>
                    <br>
                    <br>
                </div>
                </body>
            </html>`
        };

        this.typographyService.sendInfoEmail(objectEmail).subscribe(response => {
            this.confirmJewelry = true;
        });
    }

}
