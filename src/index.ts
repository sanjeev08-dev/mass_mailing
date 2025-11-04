import { readCollegesFromExcel } from './reader';
import { sendMail } from './mailer';
import { logMessage } from './logger';
import { config } from './config';

const colleges = readCollegesFromExcel('./Colleges.xlsx');

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const subject = 'Invitation to ManufexLearn 2025: National Conference on Manufacturing Excellence Learning';

  for (const college of colleges) {
    if (!college.email) {
      logMessage(`❌ Skipped: ${college.collegeName} — Missing email`);
      continue;
    }

    // Personalized salutation
    const salutation = college.headName
      ? `Dear${college.headName.includes("Prof")?"":" Prof."} ${college.headName},`
      : `Dear Professor,`;

    const body = `
      <p>${salutation}</p>

      <p>The Indian Institute of Technology Delhi (IIT Delhi) is proud to host 
      <strong>ManufexLearn 2025</strong>, a National Conference on Manufacturing Excellence Learning in Undergraduate Technology Programs,
      scheduled for <strong>November 15, 2025</strong>. This conference aims to foster a collaborative environment for sharing insights, best practices, 
      and innovative approaches to manufacturing education.</p>

      <p>The transformation of manufacturing learning at the undergraduate level is paramount for fostering innovation and preparing future engineers 
      to address the complexities of modern industry. It is crucial to emphasize hands-on experience, integrate mechatronic products, and introduce 
      <em>"Fun with Manufacturing"</em> initiatives early in undergraduate studies. This approach is vital to ignite interest across multiple disciplines 
      and significantly enhance the practical applications and creative potential within the field, ultimately shaping a new generation of adept and innovative 
      product developers for the nation.</p>

      <p>We cordially invite your esteemed institution to participate in <strong>ManufexLearn 2025</strong>. 
      We kindly request you to nominate the Head of your Central Workshop or Central Manufacturing Facility, 
      along with faculty members actively involved in teaching first-year manufacturing courses. Their 
      valuable insights and contributions will be instrumental in enriching the discussions and shaping the future of manufacturing education in India.</p>

      <p>To confirm participation, please use the registration link below:<br>
      <a href="${config.REGISTRATION_LINK}" target="_blank" style="font-size:16px; font-weight:bold; color:#1a73e8;">
        Click here to Register or Nominate Faculty
      </a></p>

      <p><strong>ManufexLearn 2025</strong> will be a comprehensive platform for dialogue and interaction among academia and industry leaders, featuring 
      thought-sharing sessions, panel discussions, industry interactions, and a student innovation show. Your institution's participation would greatly 
      enrich the intellectual discourse and contribute significantly to our collective goal of enhancing manufacturing education in the country.</p>

      <p>The conference will be held at the <strong>Lecture Hall Complex (LHC), IIT Delhi</strong>. 
      Please find the detailed conference schedule and further information on our website 
      <a href="https://manufexlearn.in">https://manufexlearn.in</a>.</p>

      <p>Thank you for your time and consideration. We eagerly anticipate your positive response and valuable participation in this important national endeavor.</p>

      <p>Sincerely,<br>
      <strong>Prof. Sunil Jha</strong><br>
      Professor, Department of Mechanical Engineering<br>
      Indian Institute of Technology Delhi</p>
    `;

    const result = await sendMail(college.email, subject, body);

    if (result.success) {
      logMessage(`✅ Mail sent successfully to ${college.email} (${college.collegeName})`);
    } else {
      logMessage(`❌ Failed to send mail to ${college.email}: ${result.error}`);
    }

    await delay(config.MAIL_DELAY_MS);
  }

  logMessage('🎉 Mailing completed!');
})();
