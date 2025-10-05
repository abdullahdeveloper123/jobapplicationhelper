
let reume = document.querySelector('#resume')
let convert = document.querySelector('#checkbtn')
let pdftext = document.querySelector('.pdftext')
let match_board = document.querySelector('.match-board')
let missing_board = document.querySelector('.missing-board')
let resume_text = ''
let job_desc = document.querySelector('#desc')
let skills = [
  'webdesign',
  'plugins',
  'html',
  'css',
  'sass',
  'tailwindcss',
  'bootstrap',
  'javascript',
  'typescript',
  'react',
  'next.js',
  'vue',
  'nuxt.js',
  'angular',
  'svelte',
  'astro',
  'redux',
  'zustand',
  'node.js',
  'express',
  'fastify',
  'nestjs',
  'deno',
  'bun',
  'python',
  'django',
  'flask',
  'fastapi',
  'php',
  'laravel',
  'golang',
  'rust',
  'graphql',
  'trpc',
  'rest',
  'websocket',
  'mysql',
  'postgresql',
  'sqlite',
  'mongodb',
  'redis',
  'firebase',
  'firestore',
  'supabase',
  'git',
  'github',
  'npm',
  'yarn',
  'pnpm',
  'webpack',
  'vite',
  'docker',
  'kubernetes',
  'vercel',
  'netlify',
  'aws',
  'azure',
  'gcp',
  'cloudflare',
  'jest',
  'cypress',
  'playwright',
  'eslint',
  'prettier'
];
let user_skills = []
let job_skills = []
let matching_skills = []
let missing_skills = []


// Get pdf resume and read
convert.addEventListener('click', () => {
  let file = reume.files[0]
  if (file != undefined && file.type == 'application/pdf') {
    let fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = () => {
      let res = fr.result;
      extracttext(res)
    }

  }
  else {
    alert('select valid file')
  }
})

// extract text from cv and save user skillset
async function extracttext(url) {
  let pdf = await pdfjsLib.getDocument(url).promise
  let page = await pdf.getPage(1)
  let txt = await page.getTextContent()
  let text = txt.items.map((s) => s.str).join("")
  resume_text = text

  for (i = 0; i < skills.length; i++) {
    if (text.toLowerCase().includes(skills[i])) {
      user_skills.push(skills[i])
    }
    if (job_desc.value.toLowerCase().replaceAll(" ", "").includes(skills[i])) {
      job_skills.push(skills[i])
    }
  }

  // Calculate percentage
  findMatchedSkills(user_skills, job_skills)
}


// Find matched & missing skills update table
function findMatchedSkills(user_skills, job_skills) {
  match_board.innerHTML = ''
  missing_board.innerHTML = ''

  for (i = 0; i < job_skills.length; i++) {
    let tr = document.createElement('tr')
    let td = document.createElement('td')

    if (user_skills.includes(job_skills[i])) {
      matching_skills.push(job_skills[i])

      td.textContent = job_skills[i]
      tr.append(td)
      match_board.append(tr)

    } else {
      missing_skills.push(job_skills[i])
      td.textContent = job_skills[i]
      tr.append(td)
      missing_board.append(tr)
    }

  }
  document.querySelector('.match_score').innerHTML = `Matching Score: ${parseInt((matching_skills.length / job_skills.length) * 100)}%`
}


// Ai cover letter generation
let gen_btn = document.querySelector('#gen_letter')
let cover_letter = document.querySelector('.cover_letter')

gen_btn.addEventListener('click', () => {
  cover_letter.style.display = 'block'
  
  const prompt = `Write only the cover letter body (no headings, titles, instructions, or extra characters). Tone: confident, humble, growth-oriented. Applicant: early-career developer with hands-on experience. Emphasize adaptability, strong fundamentals, and eagerness to learn Laravel, Inertia, and Tailwind in a professional setting.

Job Description:
${job_desc.value}

Resume:
${resume_text}


`
 cover_letter.innerHTML= `
<div class="mx-auto mt-1 mb-3">
<div class="honeycomb">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
</div>`
  ai_api(prompt)
})


// ai response generation
async function ai_api(prompt) {
  await fetch('https://jobapplicationhelper.pythonanywhere.com/api/gemini', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',

    },
    body: JSON.stringify({"prompt":prompt})
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      const markdownText = data.response.candidates[0].content.parts[0].text;
      document.querySelector('.cover_letter').innerHTML = marked.parse(markdownText);
    })
}





