import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userEmail, orderDetails } = req.body;

    if (!userEmail) {
      return res.status(400).json({ message: 'Email manquant pour l\'utilisateur.' });
    }

    if (!orderDetails || !Array.isArray(orderDetails.items)) {
      return res.status(400).json({ message: 'Les détails de la commande sont invalides ou manquants.' });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const adminMailOptions = {
        from: '"Owen Market" <noreply@owenmarket.com>',  
        to: process.env.ADMIN_EMAIL,
        subject: 'Nouvelle commande reçue - Owen Market',
        html: `
          <h2>Nouvelle commande reçue</h2>
          <p>Une nouvelle commande a été passée sur Owen Market. Voici les détails :</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px;">Produit</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Quantité</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Prix</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Numéro de dépôt</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Adresse de livraison</th>
              </tr>
            </thead>
            <tbody>
              ${orderDetails.items.map(item => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.price} F CFA</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${orderDetails.userDepositNumber}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${orderDetails.address}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <p><strong>Total :</strong> ${orderDetails.amount}</p>
          <p>Veuillez traiter cette commande dès que possible.</p>
          <p>Cordialement,</p>
          <p>L'équipe Owen Market</p>
        `,
      };

      const userMailOptions = {
        from: '"Owen Market" <noreply@owenmarket.com>',  
        to: userEmail,
        subject: 'Confirmation de commande - Owen Market',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h1 style="color: #4CAF50;">Merci pour votre commande chez Owen Market !</h1>
            <p>Votre commande a bien été reçue et est en cours de traitement. Voici les détails de votre commande :</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr>
                  <th style="border: 1px solid #ddd; padding: 8px;">Produit</th>
                  <th style="border: 1px solid #ddd; padding: 8px;">Quantité</th>
                  <th style="border: 1px solid #ddd; padding: 8px;">Prix</th>
                  <th style="border: 1px solid #ddd; padding: 8px;">Adresse de livraison</th>
                </tr>
              </thead>
              <tbody>
                ${orderDetails.items.map(item => `
                  <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${item.price} F CFA</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${orderDetails.address}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <p><strong>Total :</strong> ${orderDetails.amount}</p>
            <p>Nous vous contacterons lorsque votre commande sera expédiée.</p>
            <p>Merci de faire vos achats chez nous !</p>
            <p>Cordialement,</p>
            <p>L'équipe Owen Market</p>
          </div>
        `,
      };

      await transporter.sendMail(adminMailOptions);

      await transporter.sendMail(userMailOptions);

      res.status(200).json({ message: 'Emails envoyés avec succès' });
    } catch (error) {
      console.error('Erreur lors de l\'envoi des emails:', error);
      res.status(500).json({ message: 'Erreur lors de l\'envoi des emails' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
