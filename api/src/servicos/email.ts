import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USUARIO,
        pass: process.env.EMAIL_SENHA_APP,
    },
});

export async function enviarCodigoVerificacao(
    email: string,
    codigo: string,
) {
    await transporter.sendMail({
        from: `"AlertaSOS" <${process.env.EMAIL_USUARIO}>`,
        to: email,
        subject: 'Código de verificação - AlertaSOS',
        html: `
            <div style="font-family: Arial; padding:20px;">
                <h2>Bem-vindo ao AlertaSOS!</h2>

                <p>Seu código de verificação é:</p>

                <h1 style="letter-spacing:6px;">
                    ${codigo}
                </h1>

                <p>O código expira em 10 minutos.</p>

                <p>Se você não solicitou este cadastro, ignore este e-mail.</p>
            </div>
        `,
    });
}