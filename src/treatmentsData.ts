import { DetailedTreatment } from "./types";

export const detailedTreatments: DetailedTreatment[] = [
  {
    slug: "endoscopic-spine-surgery",
    id: "fess",
    name: "Full Monoportal Endoscopic Spine Surgery (FESS)",
    badge: "Pinnacle Keyhole Care",
    category: "Full Endoscopic Spine Surgery",
    shortDescription: "Ultra-minimally invasive intervention using an under-8mm endoscope and a single stitch, providing direct 4K visual neural access with zero major muscle detachment.",
    heroImage: "/images/treatments/endoscopic-spine-surgery.jpg",
    heroImageAlt: "Full Monoportal Endoscopic Spine Surgery anatomical cross-section showing under-8mm cannula accessing compressed nerve root",
    metrics: {
      incisionSize: "< 8 mm (Single Stitch)",
      anesthesia: "Local / Conscious Sedation",
      hospitalStay: "Same-Day Discharge (4-6 Hours)",
      recoveryTime: "Immediate Walking, Office in 3-5 Days"
    },
    overview: [
      "Full Monoportal Endoscopic Spine Surgery (FESS) represents the state of the art in modern spine care. Unlike traditional open spine surgery that requires stripping spinal muscles and cutting structural ligaments, FESS introduces an ultra-thin endoscopic cannula (<8mm diameter) directly through a natural anatomical corridor.",
      "Under continuous saline irrigation and high-definition 4K optical magnification, Dr. Dheeraj Vishwakarma directly visualizes the compressed dural sac and exiting spinal nerve roots. Specialized micro-instruments shave away bone spurs, hypertrophied ligaments, or extruded disc fragments with sub-millimeter precision, entirely sparing healthy spinal motion segments.",
      "Dr. Vishwakarma performed the first Monoportal Endoscopic Spine Surgery in the State of Rajasthan and is recognized across India for pioneering single-stitch awake spine techniques."
    ],
    symptoms: [
      {
        title: "Radiating Sciatic Leg Pain",
        description: "Sharp, shooting, or electric shock sensations travelling down the buttock, thigh, calf, and foot (radiculopathy)."
      },
      {
        title: "Neurological Weakness & Foot Drop",
        description: "Weakness when lifting the foot or toes (dorsiflexion impairment), or sudden loss of motor power while walking."
      },
      {
        title: "Persistent Numbness and Paresthesia",
        description: "Chronic tingling or loss of sensation in dermatomal distributions of the lower extremities."
      },
      {
        title: "Walking Claudication",
        description: "Severe leg fatigue or cramp-like heaviness that forces the patient to sit or bend forward after walking short distances."
      }
    ],
    causes: [
      "Lumbar disc herniation or extrusion (L4-L5, L5-S1) impinging on the thecal sac or exiting nerve root",
      "Foraminal and lateral recess canal stenosis",
      "Hypertrophied ligamentum flavum compressing neural elements",
      "Calcified osteophytes (bone spurs) narrowing the intervertebral neural exit zone",
      "Degenerative disc changes resulting in mechanical nerve irritation"
    ],
    diagnosis: [
      {
        title: "Detailed Neurological & Dermatomal Mapping",
        description: "Clinical evaluation of motor strength, deep tendon reflexes, and dermatomal sensory boundaries to verify the precise neurological level."
      },
      {
        title: "High-Resolution MRI Spine Radiography",
        description: "T2-weighted sagittal and axial MRI scans to confirm herniation morphology, canal diameter, and neural compression severity."
      },
      {
        title: "Dynamic Flexion-Extension Radiographs",
        description: "X-ray evaluations to assess structural spine stability and determine whether motion preservation without fusion is appropriate."
      }
    ],
    treatmentOptions: {
      conservative: [
        "Structured anti-inflammatory medication regimens and neuropathic pain stabilizers",
        "Targeted physical rehabilitation focused on core stabilization and nerve gliding exercises",
        "Activity modification and ergonomic posture realignment",
        "Selective image-guided nerve root blocks when conservative medications require supportive relief"
      ],
      whenSurgeryConsidered: [
        "Persistent severe pain unresponsive to 6 or more weeks of conservative medical management",
        "Progressive neurological motor weakness (e.g., developing foot drop or quadriceps weakness)",
        "Severe neurogenic claudication severely impairing normal daily mobility and independence",
        "Emergency symptoms of Cauda Equina Syndrome (loss of bowel/bladder control or saddle anesthesia)"
      ]
    },
    procedureExplanation: {
      summary: "Full Monoportal Endoscopic Spine Surgery is performed through an 8mm incision under local or conscious epidural anesthesia. A continuous saline irrigation stream maintains pristine visualization while micro-instruments relieve neural pressure.",
      steps: [
        {
          stepNumber: 1,
          title: "Intraoperative Fluoroscopic Localization",
          description: "Dr. Vishwakarma utilizes real-time low-dose C-arm imaging to precisely pinpoint the exact anatomical entry trajectory to the target spinal level."
        },
        {
          stepNumber: 2,
          title: "Micro-Keyhole Cannula Insertion (<8mm)",
          description: "A dilating sheath gently glides between muscular planes without severing muscle fibers, followed by placement of the 8mm endoscopic optical sheath."
        },
        {
          stepNumber: 3,
          title: "High-Definition 4K Visualization & Saline Irrigation",
          description: "High-pressure continuous saline clearance provides a crystal-clear visual field, washing away microscopic debris and controlling micro-bleeding without electrocautery trauma."
        },
        {
          stepNumber: 4,
          title: "Targeted Neural Decompression",
          description: "Using micro-forceps and radiofrequency probes, the compressive disc fragment or bone spur is selectively excised while the pristine pulsation of the nerve root is confirmed."
        },
        {
          stepNumber: 5,
          title: "Single-Stitch Cosmetic Closure",
          description: "The endoscope is removed and the 8mm portal is closed with a single dissolvable stitch and a small waterproof dressing."
        }
      ]
    },
    benefits: [
      "Incision under 8 mm: Single-stitch cosmetic closure without scarring",
      "No muscle peeling: Paraspinous muscles remain completely intact, eliminating chronic post-op back soreness",
      "Awake / Conscious capability: Real-time patient feedback provides unsurpassed neural safety",
      "Minimal blood loss (< 15 ml): Avoids surgical blood transfusions or long drain tubes",
      "Same-day ambulation: Patients walk independently within 4 to 6 hours after the procedure",
      "Rapid resumption of life: Desk professionals return to work within 3 to 7 days"
    ],
    risksAndLimitations: [
      "Not indicated for severe high-grade spinal slippage (Grade III/IV spondylolisthesis) requiring spinal fusion instrumentation",
      "Small risk of transient nerve irritation or numbness (typically resolves spontaneously as nerve recovers)",
      "Dural tear risk (< 1.5%), which is immediately recognizable and managed under direct optical visualization",
      "Recurrent disc herniation possibility (under 3%), identical to or lower than conventional open surgeries"
    ],
    recoveryTimeline: [
      {
        timeframe: "Hours 0 - 2",
        title: "Immediate Post-Procedure Rest",
        description: "Patient rests comfortably in the recovery suite. Neural leg pain relief is typically felt immediately upon standing."
      },
      {
        timeframe: "Hours 4 - 6",
        title: "Autonomous Walking Milestone",
        description: "Patients stand up and ambulate comfortably under nursing guidance. Independent bathroom privileges are achieved."
      },
      {
        timeframe: "Day 1",
        title: "Same-Day / Overnight Discharge",
        description: "Discharge home with simple oral analgesics and a tiny waterproof dressing. No heavy dressings or stitches to remove."
      },
      {
        timeframe: "Days 3 - 7",
        title: "Desk Work & Light Mobility",
        description: "Resumption of desk work, computer tasks, and light walking around the neighborhood."
      },
      {
        timeframe: "Weeks 4 - 6",
        title: "Full Physical Freedom",
        description: "Resumption of driving, long-distance travel, active exercise, and unrestricted daily functional lifestyle."
      }
    ],
    faqs: [
      {
        question: "Is Full Monoportal Endoscopic Spine Surgery done under general anesthesia?",
        answer: "FESS is frequently conducted under local anesthesia with conscious sedation or regional epidural block. This offers maximum safety: the patient is fully relaxed, pain-free, but awake enough to provide real-time sensory feedback when the nerve root is mobilized, virtually eliminating the risk of nerve injury."
      },
      {
        question: "How is FESS different from traditional open spine surgery?",
        answer: "Traditional surgery requires a 3 to 5 inch incision, cutting back muscles, and removing substantial bone, requiring 3-5 days in the hospital. FESS uses a single <8mm entry port, does not cut muscle, preserves spinal joints, and allows you to walk within hours and return home the same day."
      },
      {
        question: "Will I need metal screws, rods, or plates?",
        answer: "No. In FESS for disc herniations and stenosis, no spinal hardware, screws, or fusions are required. The natural stability and motion of your spine are carefully preserved."
      },
      {
        question: "How soon can I travel back home if coming from outside Jaipur or India?",
        answer: "Most out-of-town and international patients can safely travel back within 3 to 5 days following surgery, after an outpatient follow-up review with Dr. Vishwakarma."
      }
    ],
    relatedSlugs: ["endoscopic-discectomy", "slip-disc-treatment", "sciatica-treatment", "spinal-stenosis"]
  },
  {
    slug: "endoscopic-discectomy",
    id: "discectomy",
    name: "Endoscopic Discectomy",
    badge: "Keyhole Disc Preservation",
    category: "Intervertebral Disc Surgery",
    shortDescription: "Selective micro-endoscopic fragmentectomy that extracts only the ruptured disc fragment compressing the nerve, preserving up to 95% of healthy shock-absorbing disc tissue.",
    heroImage: "/images/treatments/endoscopic-discectomy.jpg",
    heroImageAlt: "Endoscopic Discectomy surgical diagram demonstrating selective micro-grasper extraction of herniated disc fragment while preserving healthy disc",
    metrics: {
      incisionSize: "7 - 8 mm (Keyhole)",
      anesthesia: "Local / Regional",
      hospitalStay: "Day Care / 24 Hours",
      recoveryTime: "Walking in 4 Hours, Desk Work in 5 Days"
    },
    overview: [
      "An Endoscopic Discectomy is the most refined surgical technique for treating painful herniated, extruded, or sequestered intervertebral discs. In conventional open discectomy, surgeons frequently remove large amounts of both damaged and healthy disc material, accelerating disc collapse and future spine instability.",
      "Under Dr. Dheeraj Vishwakarma's specialized monoportal endoscopic technique, only the extruded fragment that directly impinges on the spinal nerve sheath is selectively extracted (selective fragmentectomy). Over 90-95% of your natural cushioning disc remains untouched, preserving natural spinal biomechanics and long-term rotational shock absorption.",
      "The procedure is executed through an 8mm cannula with high-magnification optical lighting, ensuring pristine neural visualization throughout."
    ],
    symptoms: [
      {
        title: "Acute Shooting Nerve Pain",
        description: "Piercing, knife-like pain starting in the lower back and radiating through the buttock down the posterior or lateral leg."
      },
      {
        title: "Pain Aggravated by Sitting or Bending",
        description: "Intense spikes in disc pressure when bending forward, sitting, coughing, or sneezing."
      },
      {
        title: "Tingling or Prickling Sensation",
        description: "Pins and needles along the L4, L5, or S1 dermatomes, extending into the ankle and toes."
      },
      {
        title: "Weakness on Heel or Toe Walking",
        description: "Inability to walk on toes (S1 involvement) or lift the foot on heels (L5 involvement)."
      }
    ],
    causes: [
      "Sudden heavy lifting with poor lumbar biomechanics causing annulus fibrosus rupture",
      "Repetitive bending, twisting, or prolonged seated posture weakening the posterior disc wall",
      "Age-related degenerative dehydration of the nucleus pulposus making the disc prone to tearing",
      "High-impact physical sports or trauma accelerating disc herniation"
    ],
    diagnosis: [
      {
        title: "Clinical Radicular Provocation Testing",
        description: "Positive Straight Leg Raise (SLR) test and Lasegue's sign identifying nerve root tension."
      },
      {
        title: "Magnetic Resonance Imaging (MRI)",
        description: "Definitive multi-planar MRI delineating whether the disc is bulging, protruded, extruded, or sequestered in the spinal canal."
      },
      {
        title: "Dermatomal Neurological Testing",
        description: "Assessment of motor power (EHL, FHL, quadriceps) and ankle/knee tendon jerks."
      }
    ],
    treatmentOptions: {
      conservative: [
        "Short-term non-steroidal anti-inflammatory medications (NSAIDs) and muscle relaxants",
        "Targeted McKenzie extension exercises and core strengthening under physical therapy guidance",
        "Lumbar epidural steroid injections or transforaminal selective nerve root blocks"
      ],
      whenSurgeryConsidered: [
        "Severe intractable leg pain failing to improve after 4 to 6 weeks of dedicated conservative care",
        "Progressive neurological deficit such as foot drop or quadriceps muscle weakness",
        "Recurrent debilitating attacks preventing employment, walking, and normal quality of life"
      ]
    },
    procedureExplanation: {
      summary: "Endoscopic discectomy utilizes an under-8mm keyhole trajectory. Under continuous saline irrigation and 4K optical visualization, micro-graspers selectively extract the sequestered fragment.",
      steps: [
        {
          stepNumber: 1,
          title: "Anatomical Entry Trajectory",
          description: "Depending on disc location, Dr. Vishwakarma selects either an interlaminar or transforaminal keyhole route directly to the fragment."
        },
        {
          stepNumber: 2,
          title: "Neural Retraction & Protection",
          description: "The working cannula gently retracts and shields the traversing nerve root under continuous magnification."
        },
        {
          stepNumber: 3,
          title: "Selective Fragment Extraction",
          description: "Micro-pituitary forceps grasp and gently extract the sequestered disc fragment without disturbing healthy disc structure."
        },
        {
          stepNumber: 4,
          title: "Annular Sealing & Verification",
          description: "Bipolar radiofrequency probe coagulates micro-vessels, seals the annular defect, and verifies free neural pulsation."
        }
      ]
    },
    benefits: [
      "Preserves 90-95% of healthy disc tissue to prevent future degenerative collapse",
      "Keyhole incision (<8mm) closed with a single cosmetic stitch",
      "Zero paraspinous muscle disruption, eliminating severe post-operative muscle spasms",
      "Rapid same-day discharge and independent walking within 4 hours",
      "Minimal post-operative pain requiring only mild oral pain relievers"
    ],
    risksAndLimitations: [
      "Disc re-herniation rate of 2-4% over the patient's lifetime (identical to traditional surgery)",
      "Temporary numbness along the dermatome during nerve recovery",
      "Patients must maintain proper lifting ergonomics and core fitness after recovery"
    ],
    recoveryTimeline: [
      {
        timeframe: "Post-Op Hour 4",
        title: "First Steps Without Leg Pain",
        description: "The nerve is free from pressure; patients stand and walk comfortably down the hospital corridor."
      },
      {
        timeframe: "Day 1",
        title: "Discharge Home",
        description: "Patient walks to the vehicle and returns home with gentle movement instructions."
      },
      {
        timeframe: "Days 5 - 7",
        title: "Office Work Return",
        description: "Patients can resume sedentary desk jobs and light remote computer work comfortably."
      },
      {
        timeframe: "Week 4",
        title: "Core Physiotherapy",
        description: "Supervised lumbar stabilization exercises begin to reinforce core abdominal and back muscles."
      }
    ],
    faqs: [
      {
        question: "Will the disc ever slip again after endoscopic discectomy?",
        answer: "The recurrence rate after endoscopic discectomy is very low (around 2% to 4%), which is equal to or lower than conventional open surgeries. Maintaining healthy weight, regular core exercises, and good lifting ergonomics helps protect the spine long-term."
      },
      {
        question: "Can endoscopic discectomy be done for a large extruded disc?",
        answer: "Yes. Even massive extruded fragments and downward/upward migrated disc fragments can be safely extracted through the high-definition monoportal endoscope."
      },
      {
        question: "How painful is the recovery after endoscopic discectomy?",
        answer: "Because no back muscles are detached or cut, post-operative surgical pain is minimal. Most patients describe it as mild soreness around the tiny puncture wound, easily managed with basic paracetamol."
      }
    ],
    relatedSlugs: ["slip-disc-treatment", "endoscopic-spine-surgery", "sciatica-treatment"]
  },
  {
    slug: "slip-disc-treatment",
    id: "slipdisc",
    name: "Slip Disc Treatment",
    badge: "Comprehensive Disc Care",
    category: "Lumbar Disc Disorders",
    shortDescription: "Complete clinical and surgical pathway for herniated, bulging, and extruded lumbar discs, progressing from advanced conservative protocols to ultra-minimally invasive keyhole surgery.",
    heroImage: "/images/treatments/slip-disc-treatment.jpg",
    heroImageAlt: "Medical 3D illustration of a lumbar slip disc showing tear in annulus fibrosus and nerve root compression",
    metrics: {
      incisionSize: "Non-Surgical First / 8mm Keyhole",
      anesthesia: "Targeted Conscious Care",
      hospitalStay: "Outpatient to 24 Hours",
      recoveryTime: "Rapid Pain Relief within 24-48 Hours"
    },
    overview: [
      "A 'Slip Disc'—clinically known as a herniated nucleus pulposus—occurs when the tough outer ring of an intervertebral disc (annulus fibrosus) tears, allowing the soft inner gel (nucleus pulposus) to bulge or leak out into the spinal canal.",
      "This extruded material places severe mechanical pressure and chemical inflammatory irritation on the adjacent spinal nerves, causing excruciating back spasms and sharp radiating leg pain.",
      "At Dr. Dheeraj Vishwakarma's spine practice, our philosophy is conservative first: over 80% of slip disc patients improve with structured non-surgical care. For patients with unyielding agony or neurological deficits, Dr. Vishwakarma provides the least invasive surgical answer in modern neurosurgery: Full Monoportal Endoscopic Single-Stitch Discectomy."
    ],
    symptoms: [
      {
        title: "Sudden Severe Lower Back Pain",
        description: "Intense, debilitating pain triggered by lifting, bending, or sneezing that locks the lumbar spine."
      },
      {
        title: "Radiating Electric Shocks Down the Leg",
        description: "Classic sciatica radiating through the buttock, hamstring, calf, and into the foot."
      },
      {
        title: "Antalgic Scoliotic Posturing (Listing)",
        description: "The patient leans instinctively to one side to relieve pressure on the compressed nerve root."
      },
      {
        title: "Muscle Spasms and Severe Morning Stiffness",
        description: "Spasms in the paraspinal muscles making standing upright or changing positions agonizing."
      }
    ],
    causes: [
      "Age-related degenerative dehydration reducing disc elasticity and resilience",
      "Sudden twisting or heavy lifting loads with flexed spine posture",
      "Prolonged sedentary occupations causing chronic elevated intra-discal pressure",
      "Genetic predisposition to weaker connective collagen in the disc wall"
    ],
    diagnosis: [
      {
        title: "Comprehensive Physical & Neurological Examination",
        description: "Testing motor strength, sensory dermatomes, and nerve tension signs (SLR and femoral stretch)."
      },
      {
        title: "Lumbar Spine MRI (Magnetic Resonance Imaging)",
        description: "Gold standard imaging that reveals the precise size, position, and stage of disc herniation."
      },
      {
        title: "Weight-bearing Lumbar Radiographs",
        description: "Assesses spinal curvature, disc height narrowing, and structural alignment."
      }
    ],
    treatmentOptions: {
      conservative: [
        "Multimodal medical therapy: Anti-inflammatories, nerve pain modulators, and short-term muscle relaxants",
        "Targeted spine physiotherapy: Extension protocols, pelvi-lumbar stabilization, and posture retraining",
        "Image-guided spinal injections: Selective transforaminal epidural injections to soothe acute inflammation"
      ],
      whenSurgeryConsidered: [
        "Unbearable leg and back pain that does not respond to 4-6 weeks of dedicated conservative treatment",
        "Progressive neurological muscle weakness (foot drop, difficulty standing on toes/heels)",
        "Severe loss of bowel or bladder control (Cauda Equina Syndrome)—requires emergency surgery within 24 hours"
      ]
    },
    procedureExplanation: {
      summary: "When surgery is necessary, Dr. Vishwakarma performs single-stitch monoportal endoscopic discectomy. Operating through an 8mm working cannula under high-definition optic guidance, the herniated fragment is extracted without cutting back muscles.",
      steps: [
        {
          stepNumber: 1,
          title: "Precise Fluoroscopic Localization",
          description: "C-arm imaging identifies the exact millimeter coordinate of the herniated disc space."
        },
        {
          stepNumber: 2,
          title: "Micro-Portal Placement (<8mm)",
          description: "An ultra-thin endoscopic cannula slides between muscles without detaching them."
        },
        {
          stepNumber: 3,
          title: "Extraction of Herniated Gel",
          description: "Only the ruptured fragment compressing the nerve is removed; healthy disc remains intact."
        },
        {
          stepNumber: 4,
          title: "Immediate Single-Stitch Closure",
          description: "Skin edges closed with one tiny stitch; covered by a simple waterproof dressing."
        }
      ]
    },
    benefits: [
      "Conservative first: Surgery recommended only when truly necessary",
      "Under 8mm keyhole approach if surgery is indicated",
      "No muscle damage or heavy scar tissue formation",
      "Patients walk comfortably within hours after the procedure",
      "Preserves 90%+ of the native cushioning disc for lifelong spine health"
    ],
    risksAndLimitations: [
      "Conservative protocols require 4-6 weeks of patient patience and active physical therapy compliance",
      "Small risk of re-herniation (approx 3%) if heavy lifting is resumed prematurely",
      "Not all patients require surgery—an accurate MRI review is the crucial first step"
    ],
    recoveryTimeline: [
      {
        timeframe: "Week 1",
        title: "Acute Phase Relief",
        description: "Sharp nerve pain dramatically diminishes with conservative care or post-endoscopy."
      },
      {
        timeframe: "Week 2 - 4",
        title: "Active Functional Restoration",
        description: "Core exercises and walking programs restore mobility and daily independence."
      },
      {
        timeframe: "Month 2+",
        title: "Long-term Spine Resilience",
        description: "Full return to active hobbies, sports, gym routines, and normal lifestyle."
      }
    ],
    faqs: [
      {
        question: "Does every slip disc require surgery?",
        answer: "No! Over 80% to 85% of slip disc patients recover completely with conservative medical management, targeted physiotherapy, and ergonomic adjustments. Surgery is considered only if pain persists despite 6 weeks of treatment, or if there is muscle weakness."
      },
      {
        question: "Can a slipped disc heal on its own without surgery?",
        answer: "Yes. In many cases, the body's immune system naturally dehydrates and reabsorbs extruded disc fragments over a period of 6 to 12 weeks, leading to symptom resolution without surgical intervention."
      },
      {
        question: "What should I do if my doctor told me I need open spine surgery with screws?",
        answer: "Before agreeing to major open surgery with screws and fusions, get a second opinion from an experienced endoscopic spine surgeon. Most single-level slip discs can be treated through an 8mm single-stitch endoscopic procedure without any screws or fusions."
      }
    ],
    relatedSlugs: ["endoscopic-discectomy", "sciatica-treatment", "endoscopic-spine-surgery"]
  },
  {
    slug: "sciatica-treatment",
    id: "sciatica",
    name: "Sciatica Treatment & Nerve Decompression",
    badge: "Targeted Nerve Root Relief",
    category: "Radiculopathy & Nerve Compression",
    shortDescription: "Specialized clinical diagnosis and targeted nerve root decompression designed to immediately alleviate agonizing radiating buttock, thigh, and calf shooting nerve pain.",
    heroImage: "/images/treatments/sciatica-treatment.jpg",
    heroImageAlt: "Sciatica medical diagram detailing lumbar nerve roots (L4, L5, S1) joining the sciatic nerve and radiating down the leg",
    metrics: {
      incisionSize: "Non-Surgical / < 8mm Micro-Portal",
      anesthesia: "Conscious Nerve Protection",
      hospitalStay: "Same-Day Ambulation",
      recoveryTime: "Immediate Radiating Pain Relief"
    },
    overview: [
      "Sciatica is not a single disease, but a painful symptom of spinal nerve irritation. It occurs when one or more nerve roots that form the large sciatic nerve—most commonly L4, L5, or S1—are compressed or inflamed inside the spinal canal.",
      "Patients often describe sciatica as the most agonizing pain they have ever experienced: a burning, searing, or electric shock sensation that shoots from the lower back through the buttock and down the leg all the way into the toes.",
      "Dr. Dheeraj Vishwakarma uses dermatomal mapping and high-resolution MRI to locate the exact anatomical entrapment site. Treatment starts with targeted medical therapies, progressing to high-precision 4K endoscopic decompression when conservative measures fail to provide lasting relief."
    ],
    symptoms: [
      {
        title: "Searing Radiating Leg Pain",
        description: "Sharp, burning pain shooting from the gluteal region down the back or side of the thigh and calf."
      },
      {
        title: "Intolerable Sitting Pain",
        description: "Inability to sit in a chair or car for more than a few minutes without excruciating leg agony."
      },
      {
        title: "Pins, Needles & Sensory Numbness",
        description: "Constant tingling, buzzing, or deadened sensation in the shin, heel, foot sole, or toes."
      },
      {
        title: "Leg Weakness & Stumbling",
        description: "Sudden buckling of the knee or dragging of the foot while walking due to motor nerve compression."
      }
    ],
    causes: [
      "Lumbar herniated disc (L4-L5 or L5-S1) pressing directly onto exiting or traversing nerve roots",
      "Spinal canal or foraminal stenosis narrowing the nerve exit tunnels",
      "Degenerative spondylolisthesis (vertebral slippage) pinching neural bundles",
      "Piriformis syndrome compressing the sciatic nerve in the pelvic region",
      "Hypertrophied facet joint bone spurs narrowing the lateral recess"
    ],
    diagnosis: [
      {
        title: "Dermatomal Neurological Mapping",
        description: "Testing motor reflexes (patellar and Achilles), muscle group power, and sensation maps."
      },
      {
        title: "Nerve Tension Tests",
        description: "Straight Leg Raise (SLR), Bragard's test, and slump tests confirming mechanical nerve root impingement."
      },
      {
        title: "High-Resolution Lumbar MRI",
        description: "Pinpoints the exact nerve root, the compressing structure, and the degree of canal compromise."
      }
    ],
    treatmentOptions: {
      conservative: [
        "Anti-inflammatory medications, neuropathic analgesics, and short oral steroid tapers",
        "Targeted nerve flossing and spinal decompression exercises supervised by spine physical therapists",
        "Selective transforaminal epidural steroid injections (TFESI) delivering medicine directly to the inflamed nerve root"
      ],
      whenSurgeryConsidered: [
        "Unbearable radiating leg pain that persists despite 4 to 6 weeks of dedicated conservative treatment",
        "Developing motor weakness in the leg or foot (foot drop, knee instability)",
        "Severe walking limitation severely compromising basic daily living and self-sufficiency"
      ]
    },
    procedureExplanation: {
      summary: "Under Dr. Vishwakarma's endoscopic approach, the compressed nerve is freed through an under-8mm single-stitch portal. As soon as the fragment is removed, the pinched nerve expands and starts pulsating naturally.",
      steps: [
        {
          stepNumber: 1,
          title: "Targeted Entry Without Muscle Detachment",
          description: "An 8mm working sheath reaches the exact lateral recess or foraminal zone."
        },
        {
          stepNumber: 2,
          title: "Direct Visual Inspection of the Inflamed Root",
          description: "4K optics reveal the swollen, reddened nerve root compressed against the herniation or bone spur."
        },
        {
          stepNumber: 3,
          title: "Gentle Mechanical Decompression",
          description: "Micro-instruments extract the compressive fragment and trim encroaching bone spurs."
        },
        {
          stepNumber: 4,
          title: "Confirmation of Neural Freedom",
          description: "Dr. Vishwakarma visualizes healthy, rhythmic neural pulsations, confirming full release."
        }
      ]
    },
    benefits: [
      "Immediate alleviation of radiating leg shocks upon waking from the procedure",
      "Conscious anesthesia allows patient verification of nerve relief in real time",
      "Under 8mm keyhole entry with a single dissolvable stitch",
      "Spares paraspinous muscles and spinal ligaments",
      "Patients walk out of the clinic on the same day without leg pain"
    ],
    risksAndLimitations: [
      "Numbness in the toes may take several weeks to fully resolve as the nerve regenerates",
      "Rare risk of temporary dysesthesia during post-decompression neural reperfusion",
      "Patients must avoid heavy bending and lifting for the first 3-4 weeks"
    ],
    recoveryTimeline: [
      {
        timeframe: "Day of Procedure",
        title: "Instant Nerve Relief",
        description: "Patients report the agonizing shooting leg pain is gone almost immediately."
      },
      {
        timeframe: "Week 1",
        title: "Smooth Home Ambulation",
        description: "Walking comfortably around the home and resuming light daily activities."
      },
      {
        timeframe: "Week 3 - 4",
        title: "Work & Driving",
        description: "Comfortable return to driving and standard workplace duties."
      },
      {
        timeframe: "Month 2+",
        title: "Nerve Restoration",
        description: "Residual tingling fades as the chronically compressed nerve completely heals."
      }
    ],
    faqs: [
      {
        question: "Why does sciatica hurt so much more in the leg than in the back?",
        answer: "The sciatic nerve is the longest and widest nerve in your body. When its root is pinched in your lower spine, your brain interprets the pain signal as coming from wherever that nerve travels—down your thigh, calf, and foot. This phenomenon is called referred radicular pain."
      },
      {
        question: "How long does it take for sciatica to go away without surgery?",
        answer: "About 70% to 80% of sciatica cases improve within 4 to 8 weeks with proper rest, anti-inflammatory medicines, and guided physiotherapy. If pain persists beyond 6 weeks or causes muscle weakness, endoscopic decompression is strongly recommended."
      },
      {
        question: "Can sciatica cause permanent nerve damage?",
        answer: "If a severely pinched nerve is left untreated for months, chronic pressure can cause permanent motor weakness (such as permanent foot drop) or persistent numbness. Early evaluation by a spine neurosurgeon prevents irreversible nerve damage."
      }
    ],
    relatedSlugs: ["endoscopic-discectomy", "slip-disc-treatment", "spinal-stenosis"]
  },
  {
    slug: "spinal-stenosis",
    id: "monoportal",
    name: "Spinal Stenosis Treatment",
    badge: "Canal Space Restoration",
    category: "Lumbar Canal Decompression",
    shortDescription: "Advanced endoscopic decompression for spinal canal and lateral recess narrowing, widening the neural pathway without destabilizing spinal bones or requiring metal fusions.",
    heroImage: "/images/treatments/spinal-stenosis.jpg",
    heroImageAlt: "Medical diagram comparing narrow stenotic spinal canal before decompression with widened canal after endoscopic keyhole decompression",
    metrics: {
      incisionSize: "< 8 mm Keyhole",
      anesthesia: "Conscious / Regional",
      hospitalStay: "Same-Day / Overnight",
      recoveryTime: "Restored Walking Capacity in Days"
    },
    overview: [
      "Lumbar Spinal Stenosis is a degenerative condition characterized by narrowing of the spinal canal, lateral recesses, or neural exit foramina. As we age, thickened ligaments (hypertrophy of ligamentum flavum), arthritic facet joint enlargement, and disc bulges gradually choke the space available for spinal nerves.",
      "The classic hallmark of spinal stenosis is neurogenic claudication: patients can sit comfortably, but walking or standing upright causes severe cramping, heaviness, and numbness in both legs that forces them to sit down or lean forward (the 'shopping cart sign').",
      "Historically, treating stenosis required extensive open laminectomy—removing huge sections of bone, cutting muscles, and often necessitating metal rods and fusion screws. Dr. Dheeraj Vishwakarma utilizes Monoportal Endoscopic Decompression (ULBD—Unilateral Laminotomy for Bilateral Decompression), removing only the encroaching bone and thickened ligament through an 8mm portal while preserving 100% of spinal stability."
    ],
    symptoms: [
      {
        title: "Neurogenic Claudication (Walking Limitation)",
        description: "Inability to walk more than 50 to 200 meters without severe aching, heaviness, and fatigue in both legs."
      },
      {
        title: "Relief Upon Bending Forward",
        description: "Symptoms significantly improve when sitting down or leaning forward over a shopping cart or walker."
      },
      {
        title: "Bilateral Leg Heaviness & Numbness",
        description: "Sensation that the legs are made of lead, accompanied by tingling in the soles of both feet."
      },
      {
        title: "Imbalance and Unsteady Gait",
        description: "Feeling unsteady on one's feet, especially on uneven ground or in low light."
      }
    ],
    causes: [
      "Hypertrophy and calcification of the ligamentum flavum crowding the dural sac",
      "Facet joint osteoarthritis with prominent bone spur (osteophyte) overgrowth",
      "Degenerative disc bulging protruding into the anterior spinal canal",
      "Low-grade degenerative spondylolisthesis (slipping of one vertebra over another)"
    ],
    diagnosis: [
      {
        title: "Clinical Ambulation Assessment",
        description: "Evaluating walking distance before claudication symptoms force rest."
      },
      {
        title: "High-Definition Lumbar MRI",
        description: "Cross-sectional axial views precisely measuring canal diameter and identifying central vs lateral recess stenosis."
      },
      {
        title: "Dynamic Flexion-Extension X-Rays",
        description: "Verifies whether the spinal segment is biomechanically stable without abnormal slippage."
      }
    ],
    treatmentOptions: {
      conservative: [
        "Targeted flexion-based physical therapy designed to open the neural foramina and strengthen core stabilizers",
        "Medications including neuro-modulators, NSAIDs, and balance training protocols",
        "Fluoroscopic epidural steroid injections to reduce congestive venous inflammation in the canal"
      ],
      whenSurgeryConsidered: [
        "Walking tolerance drops severely, disrupting basic daily independence and quality of life",
        "Failure of structured conservative protocols after 8 to 12 weeks",
        "Progressive neurological deficits or risk of frequent falls"
      ]
    },
    procedureExplanation: {
      summary: "Endoscopic decompression relieves canal stenosis through an 8mm single-stitch portal. Using micro-diamond burrs and punch instruments under 4K magnification, Dr. Vishwakarma decompresses both the near and far sides of the canal through a single portal (ULBD technique).",
      steps: [
        {
          stepNumber: 1,
          title: "Single Keyhole Portal Approach",
          description: "An 8mm endoscopic tube enters through one side of the lamina under live fluoroscopy."
        },
        {
          stepNumber: 2,
          title: "Precision Micro-Bone Resection",
          description: "High-speed micro-burr shaves away only the inner shelf of encroaching bone, leaving the outer joint intact."
        },
        {
          stepNumber: 3,
          title: "Resection of Thickened Ligament",
          description: "The hypertrophied ligamentum flavum is carefully peeled away from the dural sac under high magnification."
        },
        {
          stepNumber: 4,
          title: "Bilateral Canal Clearance",
          description: "The endoscope tilts across to decompress the opposite side through the same 8mm incision, sparing contralateral muscle."
        }
      ]
    },
    benefits: [
      "No spinal fusion or metal screws needed: Native spinal column stability is preserved",
      "Unilateral approach treats both sides of the spine through one 8mm incision",
      "Zero muscle peeling, avoiding post-operative back muscle atrophy and chronic soreness",
      "Safe for elderly patients: Minimizes cardiovascular strain by avoiding prolonged general anesthesia",
      "Walking distance improves dramatically within days after decompression"
    ],
    risksAndLimitations: [
      "Not suitable for high-grade severe spondylolisthesis (Grade III/IV) with dynamic spinal instability",
      "Pre-existing long-term nerve numbness may take months to recover depending on duration of compression",
      "Small risk of minor dural puncture (< 2%), managed immediately through the endoscope"
    ],
    recoveryTimeline: [
      {
        timeframe: "Day 1",
        title: "Same-Day Mobilization",
        description: "Patients stand and walk down the hallway without the heavy leg fatigue experienced prior to surgery."
      },
      {
        timeframe: "Week 2",
        title: "Increasing Walking Distances",
        description: "Walking endurance increases to 500m - 1km without having to stop or sit."
      },
      {
        timeframe: "Month 1 - 2",
        title: "Active Daily Independence",
        description: "Patients resume shopping, walking for fitness, social activities, and travel with ease."
      }
    ],
    faqs: [
      {
        question: "Can elderly patients safely undergo endoscopic spinal stenosis surgery?",
        answer: "Yes! In fact, endoscopic decompression is ideal for elderly patients (including those in their 70s and 80s). Because it uses a tiny 8mm keyhole, incurs negligible blood loss (<15ml), and can be performed under regional anesthesia, cardiac and pulmonary risks are drastically lower than conventional open surgeries."
      },
      {
        question: "Will I need metal implants, screws, or rods for spinal stenosis?",
        answer: "In the vast majority of cases treated with Dr. Vishwakarma's monoportal endoscopic ULBD technique, NO metal screws or implants are needed. We preserve the structural spinal joints, eliminating the need for fusion."
      },
      {
        question: "How much will my walking distance improve after surgery?",
        answer: "Most patients experience dramatic improvement. Patients who could barely walk 50 to 100 meters before stopping often walk multiple kilometers comfortably within a few weeks post-procedure."
      }
    ],
    relatedSlugs: ["endoscopic-spine-surgery", "sciatica-treatment", "minimally-invasive-spine-surgery"]
  },
  {
    slug: "cervical-disc-treatment",
    id: "cervical",
    name: "Cervical Disc Treatment & Endoscopic Decompression",
    badge: "Neck & Arm Nerve Care",
    category: "Cervical Spine Disorders",
    shortDescription: "Targeted posterior keyhole endoscopic decompression for neck disc herniations and nerve impingement, relieving sharp shooting arm pain and restoring fine hand motor skills without neck fusion.",
    heroImage: "/images/treatments/cervical-disc-treatment.jpg",
    heroImageAlt: "Medical illustration of Cervical Disc Herniation showing posterior keyhole endoscopic decompression relieving neck and radiating arm pain",
    metrics: {
      incisionSize: "5 - 7 mm (Single Stitch)",
      anesthesia: "Targeted General / Conscious",
      hospitalStay: "24 Hours Discharge",
      recoveryTime: "Arm Pain Relieved Immediately"
    },
    overview: [
      "Cervical disc disorders in the neck (most commonly C5-C6 and C6-C7) can cause debilitating neck stiffness, severe shoulder blade pain, and shooting electric shocks down the arm and into the fingers (cervical radiculopathy). In severe cases, pressure on the spinal cord itself can impair hand dexterity and walking balance (cervical myelopathy).",
      "Traditional cervical surgery (such as ACDF—Anterior Cervical Discectomy and Fusion) enters through the front of the throat, removes the entire disc, and permanently fuses the neck bones with titanium plates and screws, permanently restricting natural neck turning mobility.",
      "Dr. Dheeraj Vishwakarma performed the FIRST Cervical Monoportal Endoscopic Discectomy in Jaipur & Rajasthan. Operating through an ultra-fine 6-7mm keyhole from the back of the neck (posterior endoscopic cervical foraminotomy/discectomy), Dr. Vishwakarma removes the herniated fragment directly, preserving 100% of natural neck motion without plates, screws, or throat incisions."
    ],
    symptoms: [
      {
        title: "Radiating Arm & Hand Pain (Cervical Radiculopathy)",
        description: "Excruciating pain shooting from the neck across the shoulder blade and down the arm into the thumb, middle, or little fingers."
      },
      {
        title: "Tingling & Numbness in the Fingers",
        description: "Loss of sensation or constant pins and needles in specific fingers corresponding to C6, C7, or C8 nerve roots."
      },
      {
        title: "Loss of Fine Motor Skills in the Hands",
        description: "Difficulty buttoning shirts, tying shoelaces, writing legibly, or frequently dropping cups and small items."
      },
      {
        title: "Severe Chronic Neck & Scapular Spasms",
        description: "Deep aching stiffness at the base of the skull and between the shoulder blades that worsens with head rotation."
      }
    ],
    causes: [
      "Cervical disc herniation or extrusion compressing exiting spinal nerve roots",
      "Cervical spondylosis and uncovertebral / facet bone spurs narrowing the neural foramen",
      "Poor prolonged neck ergonomics ('text neck', prolonged laptop/smartphone posture)",
      "Whiplash injuries or sports trauma causing acute cervical annular tears"
    ],
    diagnosis: [
      {
        title: "Spurling's Maneuver & Upper Limb Tension Tests",
        description: "Clinical examination recreating radicular arm symptoms by gently tilting and extending the cervical spine."
      },
      {
        title: "High-Resolution Cervical MRI",
        description: "Identifies disc herniation level (C4-C5, C5-C6, C6-C7), neural foraminal narrowing, and cord signal changes."
      },
      {
        title: "Cervical Dynamic X-Rays",
        description: "Rules out cervical column instability or hypermobility before choosing keyhole decompression."
      }
    ],
    treatmentOptions: {
      conservative: [
        "Short-term soft cervical collar support, ergonomic workstation adjustments, and posture retraining",
        "Non-steroidal anti-inflammatories, neuropathic medications, and short corticosteroid regimens",
        "Targeted gentle isometric cervical physical therapy and manual traction techniques"
      ],
      whenSurgeryConsidered: [
        "Uncontrollable radiating arm pain unresponsive to 4 to 6 weeks of conservative therapy",
        "Progressive weakness in the bicep, tricep, wrist extensors, or hand grip muscles",
        "Signs of cervical myelopathy (unsteady balance, hyperreflexia, loss of fine hand coordination)"
      ]
    },
    procedureExplanation: {
      summary: "Through a tiny 6-7mm portal from the back of the neck, Dr. Vishwakarma uses high-definition optics to decompress the cervical nerve root without disturbing throat structures or requiring fusion.",
      steps: [
        {
          stepNumber: 1,
          title: "Targeted Posterior Micro-Portal (6-7mm)",
          description: "An ultra-thin cannula lands safely on the cervical lamina-facet junction under continuous C-arm guidance."
        },
        {
          stepNumber: 2,
          title: "Micro-Keyhole Foraminotomy",
          description: "A fine diamond burr removes a 3-4mm rim of bone to open the compressed exit foramen."
        },
        {
          stepNumber: 3,
          title: "Extraction of the Soft Disc Fragment",
          description: "Micro-graspers tease out the herniated disc fragment pressing against the cervical nerve root."
        },
        {
          stepNumber: 4,
          title: "Full Motion Preservation & Closure",
          description: "No implants, plates, or bone grafts are inserted. The skin is closed with a single cosmetic stitch."
        }
      ]
    },
    benefits: [
      "First performed in Rajasthan by Dr. Dheeraj Vishwakarma with proven success",
      "Zero fusion: 100% of natural neck rotational motion and flexibility are preserved",
      "No throat incisions: Completely avoids swallowing difficulties (dysphagia) or hoarseness associated with anterior surgery",
      "Tiny 6mm single-stitch cosmetic entry with virtually unnoticeable scar",
      "Arm pain relief is typically felt immediately upon awakening from the procedure"
    ],
    risksAndLimitations: [
      "Not indicated for severe cervical kyphosis or multi-level spinal instability requiring structural reconstruction",
      "Temporary neck soreness around the small entry point for 2 to 3 days",
      "Patients must avoid sudden jarring neck movements during early recovery"
    ],
    recoveryTimeline: [
      {
        timeframe: "Hour 2 - 4",
        title: "Immediate Arm Relief",
        description: "The intense radiating arm pain vanishes; patients can move their arms freely without nerve shocks."
      },
      {
        timeframe: "Day 1",
        title: "Discharge Home",
        description: "Patients return home without needing rigid cervical collars or swallowing restrictions."
      },
      {
        timeframe: "Week 1 - 2",
        title: "Return to Office Duties",
        description: "Safe resumption of computer work with ergonomic monitor elevation."
      },
      {
        timeframe: "Week 4",
        title: "Full Range of Motion",
        description: "Unrestricted neck turning, driving, and active daily life with full mobility."
      }
    ],
    faqs: [
      {
        question: "How does endoscopic cervical surgery compare to traditional ACDF fusion?",
        answer: "ACDF enters through the front of your throat, removes the entire disc, and permanently fuses two neck bones together with metal plates and screws. Endoscopic cervical surgery enters through a tiny 6mm keyhole in the back of the neck, removes ONLY the damaging fragment, and leaves your neck bones unfused and fully flexible."
      },
      {
        question: "Will I need to wear a rigid neck collar after surgery?",
        answer: "In most endoscopic cases, only a soft collar is needed for a few days for comfort. Because no bones were cut or fused, you do not need weeks of rigid neck immobilization."
      },
      {
        question: "Can I turn my head normally after recovery?",
        answer: "Yes! Because no fusion was performed, your cervical spine retains its full, natural range of motion for looking left, right, up, and down."
      }
    ],
    relatedSlugs: ["endoscopic-spine-surgery", "endoscopic-discectomy", "minimally-invasive-spine-surgery"]
  },
  {
    slug: "minimally-invasive-spine-surgery",
    id: "miss",
    name: "Minimally Invasive Spine Surgery (MISS)",
    badge: "Muscle-Sparing Advanced Care",
    category: "Minimally Invasive Spine Procedures",
    shortDescription: "Advanced keyhole surgical procedures utilizing tubular muscle dilators, high-magnification operating microscopes, and real-time mapping to treat complex spinal disorders with minimal tissue trauma.",
    heroImage: "/images/treatments/minimally-invasive-spine-surgery.jpg",
    heroImageAlt: "Medical illustration of Minimally Invasive Spine Surgery showing tubular retractor gently separating muscle fibers along natural orientation",
    metrics: {
      incisionSize: "12 - 16 mm (Tubular)",
      anesthesia: "Targeted General / Regional",
      hospitalStay: "24 Hours Average",
      recoveryTime: "Rapid Ambulatory Recovery"
    },
    overview: [
      "Minimally Invasive Spine Surgery (MISS) encompasses modern surgical procedures that replace the large, traumatic incisions of traditional open spine surgery with miniature tubular pathways.",
      "In conventional surgery, back muscles are stripped away from spinal bones, resulting in significant blood loss, permanent muscle scarring, and prolonged hospital stays. MISS uses progressive tubular dilators that gently separate muscle fibers along their natural orientation without cutting them.",
      "Assisted by high-magnification surgical operating microscopes and real-time navigation, Dr. Dheeraj Vishwakarma addresses complex conditions like degenerative disc disease, recurrent disc herniations, and spinal instability with less than 15 ml of blood loss and significantly accelerated recovery."
    ],
    symptoms: [
      {
        title: "Chronic Severe Mechanical Back Pain",
        description: "Deep, grinding lower back pain aggravated by standing, bending, or lifting loads."
      },
      {
        title: "Recurrent Herniated Discs",
        description: "Return of symptoms after prior spinal procedures requiring revision surgical corridors."
      },
      {
        title: "Spondylolisthesis Symptoms",
        description: "Slipping of one vertebra over another causing nerve compression and walking instability."
      },
      {
        title: "Multi-level Spinal Stenosis",
        description: "Compression across several contiguous spinal levels requiring targeted tubular decompression."
      }
    ],
    causes: [
      "Advanced degenerative disc disease with loss of disc height and mechanical instability",
      "Spondylolisthesis (isthmic or degenerative vertebral displacement)",
      "Recurrent lumbar herniations following previous open surgeries elsewhere",
      "Spinal facet arthropathy causing nerve compression and localized instability"
    ],
    diagnosis: [
      {
        title: "Multi-planar MRI with Neural Reconstruction",
        description: "Delineates disc pathology, neural compression, and muscle quality (multifidus status)."
      },
      {
        title: "Standing & Dynamic Lumbar X-Rays",
        description: "Assesses dynamic slippage and segmental lordosis."
      },
      {
        title: "CT Scan of the Lumbar Spine",
        description: "Provides 3D bony detail of the pars interarticularis and facet architecture."
      }
    ],
    treatmentOptions: {
      conservative: [
        "Comprehensive rehabilitation focusing on core abdominal and spinal extensor muscle reconditioning",
        "Medication management with targeted anti-inflammatories and neuropathic agents",
        "Diagnostic facet joint or nerve root blocks to isolate specific pain generators"
      ],
      whenSurgeryConsidered: [
        "Persistent severe pain and disability unresponsive to conservative management",
        "Spinal instability or progressive vertebral slippage causing progressive nerve impingement",
        "Recurrent herniation with severe radicular symptoms"
      ]
    },
    procedureExplanation: {
      summary: "Using tubular dilators, Dr. Vishwakarma creates a miniature working corridor directly down to the spine. High-magnification microscopy illuminates the surgical field with unparalleled safety.",
      steps: [
        {
          stepNumber: 1,
          title: "Micro-Incision & Progressive Dilation",
          description: "A small keyhole incision is made, and tubular dilators gently split muscles along natural planes."
        },
        {
          stepNumber: 2,
          title: "Tubular Retractor Docking",
          description: "The tubular retractor is securely locked in place, maintaining a clear corridor without muscle cutting."
        },
        {
          stepNumber: 3,
          title: "High-Magnification Decompression",
          description: "Under the operating microscope, nerves are gently decompressed and the target pathology resolved."
        },
        {
          stepNumber: 4,
          title: "Natural Muscle Re-approximation",
          description: "When the tube is removed, separated muscle fibers naturally spring back together with minimal scarring."
        }
      ]
    },
    benefits: [
      "Splits muscles instead of cutting them, dramatically reducing post-operative muscle spasms",
      "Extremely low blood loss (< 15-20 ml), eliminating the need for transfusions",
      "Significantly reduced risk of surgical site infections compared to open procedures",
      "Short hospital stay (often discharged within 24 hours)",
      "Much faster return to normal work, driving, and active family life"
    ],
    risksAndLimitations: [
      "Requires advanced microsurgical training and specialized equipment",
      "Small risk of transient nerve irritation or incision soreness",
      "Patients must adhere to sensible lifting and activity guidelines during early recovery"
    ],
    recoveryTimeline: [
      {
        timeframe: "Day 1",
        title: "Early Walking",
        description: "Patients walk with assistance and can sit comfortably within 12 to 24 hours."
      },
      {
        timeframe: "Week 1",
        title: "Discharge & Home Recovery",
        description: "Comfortable mobility at home with minimal requirement for pain medications."
      },
      {
        timeframe: "Week 3 - 4",
        title: "Office Duties & Driving",
        description: "Resumption of sedentary office work, driving, and light social activities."
      },
      {
        timeframe: "Month 2 - 3",
        title: "Full Core Fitness",
        description: "Full return to gym, swimming, sports, and active lifestyle under physiotherapist guidance."
      }
    ],
    faqs: [
      {
        question: "What is the difference between MISS and traditional open surgery?",
        answer: "Traditional open surgery requires large 3 to 6 inch incisions and detaches the spine muscles from the bone. MISS uses progressive tubular dilators through a 12-16mm opening that gently push muscle fibers aside without cutting them. This leads to far less pain, less blood loss, and a much faster recovery."
      },
      {
        question: "Is MISS the same as endoscopic spine surgery?",
        answer: "Both are minimally invasive approaches. MISS typically uses tubular dilators and an operating microscope, while endoscopic surgery uses an ultra-thin under-8mm tube with an internal camera lens submerged under continuous saline irrigation. Dr. Vishwakarma selects the most appropriate technique tailored to each patient's specific spinal condition."
      },
      {
        question: "How long is the hospital stay for minimally invasive surgery?",
        answer: "Most patients are discharged within 24 to 48 hours, compared to 5 to 7 days for traditional open spinal surgery."
      }
    ],
    relatedSlugs: ["endoscopic-spine-surgery", "spinal-stenosis", "cervical-disc-treatment"]
  }
];

export function normalizeSlug(slug: string): string {
  if (!slug) return "";
  try {
    return decodeURIComponent(slug).trim().toLowerCase().replace(/^\/+|\/+$/g, "");
  } catch {
    return slug.trim().toLowerCase().replace(/^\/+|\/+$/g, "");
  }
}

export function getTreatmentBySlug(
  slug: string,
  source: DetailedTreatment[] = detailedTreatments
): DetailedTreatment | undefined {
  if (!slug) return undefined;
  const target = normalizeSlug(slug);
  if (!target) return undefined;
  return source.find((t) => t.slug && normalizeSlug(t.slug) === target);
}
