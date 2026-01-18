import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProjectImages } from '../utils/projectImages'
import GalleryModal from '../components/GalleryModal'
import LogoGrid from '../components/LogoGrid'
import ProjectDescription from '../components/ProjectDescription'

// Reusable Project Card Component with Gallery Support
const ProjectCard = ({ project, onClick, category = 'cer' }) => {
  const projectImages = useMemo(() => getProjectImages(project.title, category), [project.title, category])
  const hasImages = projectImages && projectImages.length > 0

  const handleCardClick = (e) => {
    // Only handle click if images exist and onClick handler is provided
    if (hasImages && onClick) {
      e.preventDefault()
      onClick(project)
    }
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 md:p-8 relative ${
        hasImages && onClick ? 'cursor-pointer' : ''
      }`}
      onClick={handleCardClick}
    >
      {/* Optional Gallery Button (can open blank gallery) */}
      {project.showGalleryButton && (
        <div className="absolute top-4 right-4 z-10">
          <button
            type="button"
            className="bg-primary-600 text-white px-3 py-2 rounded-md shadow-md flex items-center gap-2 text-xs font-semibold hover:bg-primary-700 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              if (typeof project.onGalleryClick === 'function') {
                project.onGalleryClick()
              }
            }}
            aria-label={`Open gallery for ${project.title}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Gallery</span>
          </button>
        </div>
      )}

      {/* Gallery Indicator Badge - Top Right (only if images exist) */}
      {!project.showGalleryButton && hasImages && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-primary-600 text-white px-2.5 py-1.5 rounded-md shadow-md flex items-center gap-1.5 text-xs font-semibold">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Gallery</span>
          </div>
        </div>
      )}

      {project.category && (
        <div className="mb-4">
          <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
            {project.category}
          </span>
        </div>
      )}
      <h3 className={`text-xl md:text-2xl font-bold text-gray-800 mb-4 ${hasImages ? 'pr-20' : ''}`}>
        {project.title}
      </h3>
      <div className="space-y-2 mb-4">
        {project.client && (
          <div className="flex items-center text-gray-700">
            <span className="font-semibold mr-2">Client:</span>
            <span>{project.client}</span>
          </div>
        )}
        {project.woNumber && (
          <div className="flex items-center text-gray-700">
            <span className="font-semibold mr-2">WO Number:</span>
            <span>{project.woNumber}</span>
          </div>
        )}
        {project.value && (
          <div className="flex items-center text-gray-700">
            <span className="font-semibold mr-2">Contract Value:</span>
            <span className="text-primary-600 font-bold">{project.value}</span>
          </div>
        )}
        {project.status && (
          <div className="flex items-center text-gray-700">
            <span className="font-semibold mr-2">Status:</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {project.status}
            </span>
          </div>
        )}
        {project.scope && (
          <div className="flex items-start text-gray-700">
            <span className="font-semibold mr-2">Scope:</span>
            <span>{project.scope}</span>
          </div>
        )}
        {project.completion && (
          <div className="flex items-center text-gray-700">
            <span className="font-semibold mr-2">Completion:</span>
            <span>{project.completion}</span>
          </div>
        )}
      </div>
      {project.description && (
        <p className="text-gray-600 leading-relaxed">{project.description}</p>
      )}
    </div>
  )
}

const Projects = () => {
  const [activeGallery, setActiveGallery] = useState(null)

  const dynamicProjectImagesByFolderName = useMemo(() => {
    // CRITICAL: Load from src/assets/projects/cer/{project-folder}/ exactly as folder names exist.
    // No renaming, no guessing. Adding files later requires no code change.
    const modules = import.meta.glob('../assets/projects/cer/**/*.{jpg,jpeg,png,webp}', {
      eager: true,
      import: 'default',
    })

    /** @type {Record<string, {src: string, file: string}[]>} */
    const grouped = {}

    Object.entries(modules).forEach(([path, src]) => {
      const normalized = path.replace(/\\/g, '/')
      const match = normalized.match(/\/assets\/projects\/cer\/([^/]+)\//)
      const folderName = match?.[1]
      if (!folderName) return
      if (!grouped[folderName]) grouped[folderName] = []
      grouped[folderName].push({ src, file: normalized })
    })

    Object.keys(grouped).forEach((folderName) => {
      grouped[folderName].sort((a, b) => a.file.localeCompare(b.file))
    })

    return grouped
  }, [])

  const getDynamicImagesForFolderName = (folderName) => {
    if (!folderName) return []
    return (dynamicProjectImagesByFolderName[folderName] || []).map((x) => x.src)
  }

  const openDynamicGallery = (title, folderName) => {
    const images = getDynamicImagesForFolderName(folderName)
    setActiveGallery({ title, images })
  }

  const parentNoGalleryNoClientNoStatus = useMemo(
    () => new Set(['SG City-63A, Sector-63A, Gurugram', 'Twin Tower DXP, Sector-84, Gurugram']),
    []
  )

  const blankGalleryProjectTitles = useMemo(
    () =>
      new Set([
        'GPS Mohammad Heri (Primary School)',
        'GPS Babupur (Primary School)',
        'GMS Dharampur (Middle School)',
        'GPS Nurpur Jharsa',
        'GPS Dharampur',
        'GPS Hasanpur',
        'Govt. Sr. Secondary School, Khoh',
      ]),
    []
  )

  const clientLogos = useMemo(() => {
    const modules = import.meta.glob('../assets/clients/*.{png,jpg,jpeg,webp,avif,svg}', {
      eager: true,
      import: 'default',
    })
    return Object.values(modules)
  }, [])

  const productLogos = useMemo(() => {
    const modules = import.meta.glob('../assets/products/*.{png,jpg,jpeg,webp,avif,svg}', {
      eager: true,
      import: 'default',
    })
    return Object.values(modules)
  }, [])

  // Handle gallery opening
  const handleProjectClick = (project) => {
    // Determine category based on project category or use provided category
    let category = 'cer'
    if (project.category?.toLowerCase().includes('residential') || 
        project.category === 'Residential & Infrastructure') {
      category = 'residential'
    }
    
    const images = getProjectImages(project.title, category)
    
    if (images && images.length > 0) {
      setActiveGallery({
        title: project.title,
        images: images,
      })
    }
  }

  // Handle gallery closing
  const handleCloseGallery = () => {
    setActiveGallery(null)
  }

  // Existing projects for Project Highlights section
  const projects = [
    {
      title: 'Govt. Girls Primary School, Tikkli',
      client: 'Signature Global',
      value: '₹19.5 Lakh',
      category: 'CSR School Renovation',
      description: 'Complete renovation project for government primary school including infrastructure upgrades and facility improvements.',
      status: 'Completed',
    },
    {
      title: 'Govt. Sr. Secondary School, Tikkli',
      client: 'Signature Global',
      value: '₹32.7 Lakh',
      category: 'CSR School Renovation',
      description: 'Comprehensive renovation of senior secondary school with modern facilities and infrastructure enhancements.',
      status: 'Completed',
    },
    {
      title: 'INFRASTRUCTURE DEVELOPMENT',
      client: 'The New Haryana L&C Co-Op Society Ltd.',
      value: '₹85+ Lakhs (Total)',
      category: 'Multiple Civil & Infrastructure Works, Haryana',
      description: 'Execution of multiple government infrastructure projects across Haryana under society sub-contracts, including drainage, road works, public buildings, and park development. All works were completed successfully, on time, and certified with full payment clearance.',
      highlight: true,
      projectFolderName: 'INFRASTRUCTURE DEVELOPMENT',
      showGalleryButton: true,
    },
    {
      title: 'Luxury Banquet Halls – Design & Build, Rohtak',
      category: 'Proprietor\'s technical background ',
      projectsLabel: 'Projects',
      projectsList: ['Singhasan Banquet Hall & Lawn', 'Suncity Banquet & Lawn', 'The Crown'],
      description:
        'End-to-end conceptualization, design, and construction of multiple premium banquet halls in Rohtak, delivering large clear-span event spaces with high-end interiors and fully coordinated civil & MEP execution.\n\n' +

        
        ' Technical Scope & Expertise\n' +
        '- Large clear-span structural design (column-free halls)\n' +
        '- Heavy load planning for chandeliers & service equipment\n' +
        '- High-end interior finishes (Italian/vitrified marble flooring, POP & gypsum ceilings)\n' +
        '- Decorative wall panelling & façade treatment\n' +
        '- Complete MEP coordination:\n' +
        '  • HVAC ducting\n' +
        '  • Power distribution\n' +
        '  • Decorative & ambient lighting\n' +
        '  • Kitchen plumbing & drainage\n' +
        '- End-to-end project management:\n' +
        '  • Planning & scheduling\n' +
        '  • Contractor coordination\n' +
        '  • Quality control & cost optimization',
      projectFolderName: 'PREMIUM COMMERCIAL CONSTRUCTION',
      showGalleryButton: true,
    },
  ]

  // Section 5.2: Grouped School Projects (CER)
  const groupedProjects = [
    {
      groupName: 'Millennia-III, Sector-37D, Gurugram',
      client: 'Sternal Buildcon Pvt. Ltd. (Signature Global Group)',
      projects: [
        {
          title: 'GPS Mohammad Heri (Primary School)',
          woNumber: 'WO 032/25-26',
          value: '₹28,38,271',
          status: 'Active',
          category: 'CER School Project',
        },
        {
          title: 'GPS Babupur (Primary School)',
          woNumber: 'WO 031/25-26',
          value: '₹32,48,747',
          status: 'Active',
          category: 'CER School Project',
        },
        {
          title: 'GMS Dharampur (Middle School)',
          woNumber: 'WO 033/25-26',
          value: '₹30,84,274',
          status: 'Active',
          category: 'CER School Project',
        },
      ],
    },
    {
      groupName: 'SG City-63A, Sector-63A, Gurugram',
      client: 'Signature Global India Ltd',
      projects: [
        {
          title: 'GPS Nurpur Jharsa',
          woNumber: 'WO 1553',
          value: '₹31,86,210',
          status: 'Active',
          category: 'CER School Project',
        },
        {
          title: 'GPS Dharampur',
          woNumber: 'WO 1552',
          value: '₹21,78,100',
          status: 'Active',
          category: 'CER School Project',
        },
        {
          title: 'GPS Hasanpur',
          woNumber: 'WO 1559',
          value: '₹28,36,295',
          status: 'Active',
          category: 'CER School Project',
        },
      ],
    },
    
    {
      groupName: 'Twin Tower DXP, Sector-84, Gurugram',
      client: 'Forever Buildtech Ltd. (Signature Global Group)',
      projects: [
        {
          title: 'Govt. Sr. Secondary School, Khoh',
          value: '₹25,97,335',
          status: 'Active',
          category: 'CER School Project',
        },
      ],
    },
  ]

  // Section 5.3: Residential & Infrastructure Projects
  const residentialProjects = [
    {
      title: 'Orchard Avenue-1, Sector-93, Gurugram',
      client: 'Skyfull Maintenance Services Pvt. Ltd. (Signature Global Group)',
      scope: 'STP/WTP/UGT/ESS maintenance',
      value: '₹5,44,930',
      category: 'Residential & Infrastructure',
      status: 'Active',
    },
    {
      title: 'Orchard Avenue-2, Sector-93, Gurugram',
      client: 'Skyfull Maintenance Services Pvt. Ltd. (Signature Global Group)',
      value: '₹4,95,640',
      scope: 'STP/WTP/UGT/ESS maintenance',
      category: 'Residential & Infrastructure',
      status: 'Active',
    },
    {
      title: 'Roselia-1, Sector-95A, Gurugram',
      client: 'Skyfull Maintenance Services Pvt. Ltd. (Signature Global Group)',
      value: '₹4,60,831',
      scope: 'STP/WTP/UGT/ESS maintenance',
      category: 'Residential & Infrastructure',
      status: 'Active',
    },
    {
      title: 'Roselia-2, Sector-95A, Gurugram',
      client: 'Skyfull Maintenance Services Pvt. Ltd. (Signature Global Group)',
      value: '₹4,95,390',
      scope: 'STP/WTP/UGT/ESS maintenance',
      category: 'Residential & Infrastructure',
      status: 'Active',
    },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight">Projects & Experience</h1>
          <p className="text-lg sm:text-xl md:text-xl text-primary-100 leading-relaxed">
            Proven Track Record in Civil Construction & Infrastructure
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Project Highlights
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our portfolio showcases successful execution of diverse projects across CSR school renovation, group housing infrastructure, and commercial construction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const category = project.category?.toLowerCase().includes('infrastructure') ? 'residential' : 'cer'
              const projectImages = getProjectImages(project.title, category)
              const showDynamicGalleryButton = Boolean(project.showGalleryButton && project.projectFolderName)
              const hasImages = !showDynamicGalleryButton && projectImages && projectImages.length > 0
              
              return (
                <div
                  key={index}
                  className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-8 relative ${
                    project.highlight ? 'border-2 border-primary-500' : ''
                  } ${hasImages ? 'cursor-pointer' : ''}`}
                  onClick={() => hasImages && handleProjectClick(project)}
                >
                  {/* Gallery button for specific cards (even if empty) */}
                  {showDynamicGalleryButton && (
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        type="button"
                        className="bg-primary-600 text-white px-3 py-2 rounded-md shadow-md flex items-center gap-2 text-xs font-semibold hover:bg-primary-700 transition-colors"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          openDynamicGallery(project.title, project.projectFolderName)
                        }}
                        aria-label={`Open gallery for ${project.title}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>Gallery</span>
                      </button>
                    </div>
                  )}

                  {/* Gallery Indicator Badge - Top Right (only if images exist) */}
                  {!showDynamicGalleryButton && hasImages && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-primary-600 text-white px-2.5 py-1.5 rounded-md shadow-md flex items-center gap-1.5 text-xs font-semibold">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>Gallery</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-primary-600 uppercase tracking-wide">
                      {project.category}
                    </span>
                  </div>
                  <h3 className={`text-2xl font-bold text-gray-800 mb-4 ${hasImages ? 'pr-20' : ''}`}>
                    {project.title}
                  </h3>

                  {/* Status: Completed badge for specified completed highlight projects */}
                  {project.status === 'Completed' && (
                    <div className="mb-3 -mt-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        Status: Completed
                      </span>
                    </div>
                  )}

                  <div className="space-y-2 mb-4">
                    {project.client && (
                      <div className="flex items-center text-gray-700">
                        <span className="font-semibold mr-2">Client:</span>
                        <span>{project.client}</span>
                      </div>
                    )}

                    {project.projectsList && project.projectsLabel ? (
                      <div className="flex items-start text-gray-700">
                        <span className="font-semibold mr-2">{project.projectsLabel}:</span>
                        <div className="text-gray-800">
                          <ul className="list-disc pl-5 space-y-1">
                            {project.projectsList.map((p) => (
                              <li key={p}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      project.value && (
                        <div className="flex items-center text-gray-700">
                          <span className="font-semibold mr-2">Project Value:</span>
                          <span className="text-primary-600 font-bold">{project.value}</span>
                        </div>
                      )
                    )}
                  </div>

                  {project.projectFolderName === 'PREMIUM COMMERCIAL CONSTRUCTION' ? (
                    <ProjectDescription description={project.description} />
                  ) : (
                    <p className="text-gray-600 leading-relaxed">{project.description}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 5.2: Ongoing / Recently Awarded School Projects (CER) */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Ongoing / Recently Awarded School Projects (CER)
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our active and recently awarded Corporate Education Responsibility (CER) projects across Gurugram.
            </p>
          </div>

          <div className="space-y-16">
            {groupedProjects.map((group, groupIndex) => (
              <div key={groupIndex} className="border-b border-gray-200 pb-12 last:border-b-0 last:pb-0">
                <div className="mb-8">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                        {group.groupName}
                      </h3>
                    </div>
                  </div>

                  {/* For SG City-63A and Twin Tower DXP: remove Client, Status, and Gallery button */}
                  {!parentNoGalleryNoClientNoStatus.has(group.groupName) && (
                    <p className="text-lg text-gray-600">
                      <span className="font-semibold">Client:</span> {group.client}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.projects.map((project, projectIndex) => {
                    const shouldBlankGallery = blankGalleryProjectTitles.has(project.title)
                    const projectWithGallery = shouldBlankGallery
                      ? {
                          ...project,
                          showGalleryButton: true,
                          onGalleryClick: () => setActiveGallery({ title: project.title, images: [] }),
                        }
                      : project

                    return (
                      <ProjectCard
                        key={projectIndex}
                        project={projectWithGallery}
                        onClick={handleProjectClick}
                        category="cer"
                      />
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5.3: Residential & Infrastructure Projects */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Residential & Infrastructure Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Specialized infrastructure maintenance and development projects for residential complexes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {residentialProjects.map((project, index) => (
              <ProjectCard 
                key={index} 
                project={project} 
                onClick={handleProjectClick}
                category="residential"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Clients & Trusted Products */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Clients & Trusted Products</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A selection of clients and trusted products/materials used across our projects.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10">
           
            <LogoGrid title=" Our Trusted Products / Brands " images={productLogos} />
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {activeGallery && (
        <GalleryModal
          serviceTitle={activeGallery.title}
          images={activeGallery.images || []}
          onClose={handleCloseGallery}
        />
      )}

      {/* Experience Summary */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 text-gray-800 leading-tight">
            Our Experience
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">CSR Projects</h3>
              <p className="text-gray-600">Proven expertise in CSR/CER school renovation with multiple successful projects.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Infrastructure Works</h3>
              <p className="text-gray-600">Specialized in STP, WTP, UGT, and ESS works for group housing projects.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-600 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">₹7+ Crore Portfolio</h3>
              <p className="text-gray-600">Total project value exceeding ₹7 Crore across various sectors.</p>
            </div>
          </div>

          <div className="bg-primary-50 border-l-4 border-primary-600 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Why Clients Choose Us
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Quality Execution
                </h4>
                <p className="text-gray-600 text-sm ml-7">Superior quality standards in every project we undertake.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Timely Completion
                </h4>
                <p className="text-gray-600 text-sm ml-7">Projects delivered on schedule without compromising quality.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Statutory Compliance
                </h4>
                <p className="text-gray-600 text-sm ml-7">Full compliance with all regulatory requirements.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Disciplined Site Management
                </h4>
                <p className="text-gray-600 text-sm ml-7">Professional and organized approach to project management.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-6 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight">
            Let's Build Something Great Together
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-7 md:mb-8 text-primary-100 leading-relaxed">
            Contact us to discuss your project requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors shadow-lg inline-block text-center"
            >
              Contact Us
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-colors inline-block text-center"
            >
              Request Site Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Projects

