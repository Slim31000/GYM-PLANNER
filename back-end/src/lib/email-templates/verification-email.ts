export function buildVerificationEmail(url: string) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin-bottom: 16px;">Bienvenue sur Gym Planner</h2>

      <p>Merci pour ton inscription.</p>
      <p>Clique sur le bouton ci-dessous pour vérifier ton adresse email :</p>

      <p style="margin: 24px 0;">
        <a
          href="${url}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #111827;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
          "
        >
          Vérifier mon email
        </a>
      </p>

      <p>Si le bouton ne fonctionne pas, copie ce lien dans ton navigateur :</p>
      <p style="word-break: break-all;">${url}</p>
    </div>
  `;
}