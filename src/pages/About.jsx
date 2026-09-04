import PageContentBand from '../components/PageContentBand'
import ScrollReveal from '../components/ScrollReveal'
import aboutHeroUrl from '../assets/about/about-hero.jpg?url'

const heroShell = 'max-w-6xl mx-auto w-full px-2.5 sm:px-4 lg:px-6'
const HERO_MIN_H = 'min-h-[17rem] sm:min-h-[19.5rem] md:min-h-[22.5rem]'

const SECTIONS = [
  {
    id: 'what',
    question: 'What is this project?',
    paragraphs: [
      'STEM Across Rural America is a storytelling project aimed to highlight the voices of rural Americans in educational communities. Most of the project comes from in-person conversations with people I met around the country this summer, as well as virtual conversations when I couldn\u2019t be in their community. Through conversations and reflections with teachers, students, and more, I hope to shed light on their lived experiences to look at rural education through people, not numbers.',
    ],
  },
  {
    id: 'why',
    question: 'Why rural STEM stories?',
    paragraphs: [
      'Growing up frustrated with the rural education system and educational access in my small town, I knew I wanted to help improve education in rural communities like my own. When I started researching access to education in rural areas, I found something interesting: rural education is usually looked at through limited access to structural and institutional opportunities (such as online college courses, nearby universities, access to laboratory materials, etc.). However, there isn\u2019t much research on the sides of identity and belonging, which play a huge role in educational settings.',
      'I saw this in my own life; I wasn\u2019t going to apply to Princeton because I thought my identity as a rural student meant I\u2019d never be able to get in. I hadn\u2019t seen others in my town do it and I accepted it as a fact of life that I couldn\u2019t have that opportunity before I even tried to achieve it. Luckily, my parents convinced me to apply, but how many other capable rural students are out there unaware of what they can achieve?',
      'So, I decided to do research through storytelling. Rather than looking at data or structural access, I wanted to go straight to the people in rural areas to hear their own experiences and thoughts. My heart is in rural America and we cannot work to improve education for rural communities unless we go directly to them and hear what they have to say.',
    ],
  },
  {
    id: 'goal',
    question: 'What is the goal of this project?',
    paragraphs: [
      'The goal of this project is to provide a space where rural voices are heard. Oftentimes rural education is seen through a lens of funding; throw more money at them for better science materials, or, this school is suffering because they don\u2019t have enough staffing and there\u2019s no other way to help them.',
      'These narrow views of rural districts are harmful; the fact of the matter is that if we aren\u2019t listening to the people who are actually teaching and learning in these schools every day, progress will be stunted. We need to hear what\u2019s working, what\u2019s not, and how education can be improved regardless of access to resources. I met countless amazing teachers and students who are resourceful and passionate in their communities, and their stories need to be uplifted to show the capability, beauty, and hope in rural education.',
    ],
  },
]

function SectionBlock({ question, paragraphs }) {
  return (
    <ScrollReveal>
      <article className="overflow-hidden rounded-[1.35rem] border-2 border-rust-400/55 bg-white shadow-xl shadow-rust-900/10 ring-2 ring-rust-300/30">
        <div className="border-l-[14px] border-l-sage-700 px-6 py-8 sm:border-l-[18px] sm:px-9 sm:py-10 md:px-11 md:py-12">
          <h2 className="font-display text-[1.85rem] italic leading-[1.15] text-earth-900 sm:text-[2.35rem] lg:text-[2.65rem]">
            {question}
          </h2>
          <div className="mt-4 h-1 w-14 rounded-full bg-rust-500 sm:mt-5 sm:w-16" aria-hidden />
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-earth-800 sm:mt-7 sm:space-y-6 sm:text-xl sm:leading-[1.65]">
            {paragraphs.map((paragraph) => {
              const hugeIdx = paragraph.indexOf('huge')
              if (hugeIdx === -1) {
                return <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              }
              return (
                <p key={paragraph.slice(0, 48)}>
                  {paragraph.slice(0, hugeIdx)}
                  <em>huge</em>
                  {paragraph.slice(hugeIdx + 4)}
                </p>
              )
            })}
          </div>
        </div>
      </article>
    </ScrollReveal>
  )
}

export default function About() {
  return (
    <>
      <section className={`relative flex flex-col overflow-hidden ${HERO_MIN_H}`}>
        <div className="absolute inset-0 z-0">
          <ScrollReveal photo className="absolute inset-0">
            <img
              src={aboutHeroUrl}
              alt=""
              sizes="100vw"
              className="h-full w-full object-cover object-[50%_28%] sm:object-[50%_26%] lg:object-[50%_24%]"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </ScrollReveal>
        </div>

        <div className="relative z-10 flex min-h-0 min-h-[inherit] flex-1 flex-col items-center justify-center">
          <div className={`${heroShell} w-full py-8 text-center sm:py-9 md:py-10`}>
            <ScrollReveal>
              <div className="mx-auto w-full max-w-4xl">
                <h1 className="font-display text-[2.75rem] leading-none text-white drop-shadow-sm sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]">
                  About Rural STEM Stories
                </h1>
                <div
                  className="mx-auto mt-2.5 h-px w-14 bg-gradient-to-r from-transparent via-rust-400 to-transparent sm:mt-3 sm:w-20"
                  aria-hidden
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <PageContentBand field="route" reveal={false}>
        <div className="mx-auto max-w-5xl space-y-8 sm:space-y-10 lg:space-y-12">
          {SECTIONS.map((section) => (
            <SectionBlock key={section.id} {...section} />
          ))}
        </div>
      </PageContentBand>
    </>
  )
}
