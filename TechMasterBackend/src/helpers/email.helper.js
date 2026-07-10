export const emailTemplate = (title, message) => {
  return `
    <div style="font-family: Arial, sans-serif; padding:20px;">
      <h2>${title}</h2>
      <p>${message}</p>
      <br/>
      <p>Regards,</p>
      <strong>3D Backend Team</strong>
    </div>
  `;
};