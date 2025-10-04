
let reume = document.querySelector('#resume')
let convert = document.querySelector('#checkbtn')
let pdftext = document.querySelector('.pdftext')
let match_board = document.querySelector('.match-board')
let missing_board = document.querySelector('.missing-board')

// let job_desc = document.querySelector('#desc')
let job_desc = `We’re looking for a skilled Web Developer to manage and maintain several WordPress websites across our brand portfolio. This role emphasizes technical functionality, performance optimization, and seamless user experience. You’ll ensure all websites operate efficiently, are secure, and are regularly updated.

Key Responsibilities:

Manage the functionality and performance of multiple WordPress websites
Implement new features, plugins, and custom solutions using WordPress
Troubleshoot bugs, broken layouts, or compatibility issues
Optimize site speed, performance, and SEO
Ensure all sites are responsive and function across modern browsers/devices
Regularly update themes, plugins, and WordPress core
Coordinate with design team to integrate visual assets and UI enhancements
Liaise with third-party developers or vendors as needed
Qualifications:

2+ years of experience in front-end or full-stack web development
Expertise in WordPress (custom themes, plugins, builders like Elementor or WPBakery)
Strong understanding of HTML, CSS, and basic PHP
Experience troubleshooting and optimizing web performance
Ability to manage multiple projects and timelines
Strong technical problem-solving skills
Bonus Skills:

Basic knowledge of JavaScript or front-end frameworks (React, Vue, etc.)
Familiarity with hosting, DNS, and website security best practices
Job Type: Part-time

Expected hours: 10 – 20 per week

Application Question(s):

How many years have you worked with WordPress, and what specific tasks have you handled (e.g., custom themes, plugin integration, troubleshooting, performance optimization)?
Which page builders and tools have you used most frequently in WordPress (e.g., Elementor, WPBakery), and are you comfortable customizing or extending their functionality?
How confident are you working with HTML, CSS, and PHP for customizing themes and plugins? Can you share a brief example of a customization you’ve implemented?`


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
  //  console.log(text)

  for (i = 0; i < skills.length; i++) {
    if (text.toLowerCase().includes(skills[i])) {
      user_skills.push(skills[i])
      // console.log(user_skills)
    }
    if (job_desc.toLowerCase().replaceAll(" ", "").includes(skills[i])) {
      job_skills.push(skills[i])
      // console.log(job_skills)
    }
  }

  // Calculate percentage
  document.querySelector('match_score').innerHTML = matching_skills.length / job_skills.length * 100
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

  console.log(`job skills:${job_skills}`)
  console.log(`user skills:${user_skills}`)

  console.log(`matching skills:${matching_skills}`)
  console.log(`missing skills:${missing_skills}`)
}





