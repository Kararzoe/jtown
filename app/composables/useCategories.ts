export interface ServiceCategory {
  slug: string
  label: string
  icon: string
  image?: string
}

const categoryDefs: { slug: string, key: string, icon: string, image?: string }[] = [
  { slug: 'plumbing', key: 'plumbingCat', icon: 'i-lucide-wrench', image: '/images/cat-plumbing.webp' },
  { slug: 'electrical', key: 'electriciansCat', icon: 'i-lucide-zap' },
  { slug: 'ac', key: 'acCat', icon: 'i-lucide-snowflake' },
  { slug: 'furniture', key: 'furnitureCat', icon: 'i-lucide-sofa' },
  { slug: 'painting', key: 'paintingCat', icon: 'i-lucide-paint-roller' },
  { slug: 'mechanic', key: 'mechanicCat', icon: 'i-lucide-car' },
  { slug: 'barbing', key: 'barbingCat', icon: 'i-lucide-scissors', image: '/images/cat-salon.webp' },
  { slug: 'carpentry', key: 'carpentryCat', icon: 'i-lucide-hammer', image: '/images/cat-carpentry.webp' },
  { slug: 'fashion-design', key: 'fashionDesignCat', icon: 'i-lucide-shirt', image: '/images/cat-fashion.webp' },
  { slug: 'shoemaking', key: 'shoemakerCat', icon: 'i-lucide-footprints' },
  { slug: 'photography', key: 'photographyCat', icon: 'i-lucide-camera', image: '/images/cat-photography.webp' },
  { slug: 'tech', key: 'techCat', icon: 'i-lucide-laptop' },
  { slug: 'logistics', key: 'logisticsCat', icon: 'i-lucide-truck' },
  { slug: 'laundry', key: 'laundryCat', icon: 'i-lucide-washing-machine', image: '/images/cat-cleaning.webp' },
  { slug: 'education', key: 'educationCat', icon: 'i-lucide-graduation-cap' },
  { slug: 'perfumery', key: 'perfumeryCat', icon: 'i-lucide-spray-can' },
  { slug: 'makeup', key: 'makeupCat', icon: 'i-lucide-brush' },
  { slug: 'event-planning', key: 'eventCat', icon: 'i-lucide-calendar-heart' },
  { slug: 'rentals', key: 'rentalsCat', icon: 'i-lucide-key-round' },
  { slug: 'mason', key: 'masonCat', icon: 'i-lucide-brick-wall' },
  { slug: 'phone-accessories', key: 'phoneAccCat', icon: 'i-lucide-smartphone' },
  { slug: 'legal', key: 'legalCat', icon: 'i-lucide-scale' },
  { slug: 'housing-agent', key: 'housingCat', icon: 'i-lucide-house' },
  { slug: 'e-wallet', key: 'ewalletCat', icon: 'i-lucide-wallet' },
]

export const useCategories = () => {
  const { t } = useLanguage()

  const categories = computed<ServiceCategory[]>(() =>
    categoryDefs.map(({ key, ...c }) => ({ ...c, label: t(key) }))
  )

  const featuredCategories = computed(() => categories.value.filter(c => c.image))

  const findCategory = (slug: string) => categories.value.find(c => c.slug === slug)

  return { categories, featuredCategories, findCategory }
}
