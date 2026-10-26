import z from "zod";





export const heroButtonSchema = z.object({
  text: z.string().min(2, 'Button text must be at least 2 characters').max(50, 'Button text must be at most 50 characters'),
  href: z.string().min(1, 'Button link is required'),
  variant: z.enum(['primary', 'secondary'] as const, {
    message: 'Variant must be either primary or secondary'
  })
});

export const heroSchema = z.object({
  headline: z.string().min(10, 'Headline must be at least 10 characters').max(200, 'Headline must be at most 200 characters'),
  subtext: z.string().min(20, 'Subtext must be at least 20 characters').max(500, 'Subtext must be at most 500 characters'),
  backgroundVideo: z.string().url('Background video must be a valid URL').optional().or(z.literal('')),
  buttons: z.array(heroButtonSchema).min(1, 'At least one button is required').max(3, 'Maximum 3 buttons allowed')
});

export const statisticSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(2, 'Label must be at least 2 characters').max(100, 'Label must be at most 100 characters'),
  value: z.number().int('Value must be an integer').min(0, 'Value must be positive'),
  suffix: z.string().max(20, 'Suffix must be at most 20 characters').optional().or(z.literal('')),
  icon: z.string().min(1, 'Icon is required'),
  order: z.number().int('Order must be an integer').min(0, 'Order must be positive').optional()
});

export const reorderStatisticsSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    order: z.number().int().min(0)
  }))
});

const httpUrl = z
  .string()
  .url("Must be a valid URL")
  .refine(
    (value) => value.startsWith("http://") || value.startsWith("https://"),
    "URL must use http or https"
  )

const newsSlugSchema = z
  .string()
  .max(120, "Slug must be at most 120 characters")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be lowercase letters, numbers, and hyphens only"
  )

export const newsSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be at most 200 characters"),
  excerpt: z
    .string()
    .min(20, "Excerpt must be at least 20 characters")
    .max(500, "Excerpt must be at most 500 characters"),
  content: z.string().optional().or(z.literal("")),
  thumbnail: httpUrl,
  category: z
    .string()
    .trim()
    .min(2, "Category is required")
    .max(50, "Category must be at most 50 characters"),
  slug: newsSlugSchema.optional(),
  readTime: z
    .string()
    .max(30, "Read time must be at most 30 characters")
    .optional()
    .or(z.literal("")),
  featured: z.boolean().default(false),
  publishedAt: z.coerce.date(),
})

export const createStaffUserSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Invalid email"),
  password: z.string().min(10, "Password must be at least 10 characters"),
})

export const teamMemberSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters').max(100, 'Role must be at most 100 characters'),
  category: z.string().min(2, 'Section is required').max(50, 'Section must be at most 50 characters').default('Other'),
  bio: z.string().max(1000, 'Bio must be at most 1000 characters').optional().or(z.literal('')),
  photo: z.string().url('Photo must be a valid URL'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  linkedin: z.string().url('LinkedIn must be a valid URL').optional().or(z.literal('')),
  twitter: z.string().url('Twitter must be a valid URL').optional().or(z.literal('')),
  order: z.number().int('Order must be an integer').min(0, 'Order must be positive').optional()
});

export const reorderTeamMembersSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    order: z.number().int().min(0)
  }))
});

export const partnerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be at most 100 characters'),
  logo: z.string().url('Logo must be a valid URL'),
  website: z.string().url('Website must be a valid URL').optional().or(z.literal('')),
  order: z.number().int('Order must be an integer').min(0, 'Order must be positive').optional()
});

export const reorderPartnersSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    order: z.number().int().min(0)
  }))
});

export const programmeSchema = z.object({
  id: z.string(),
  title: z.string().min(2, 'Title must be at least 2 characters').max(100, 'Title must be at most 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(1000, 'Description must be at most 1000 characters'),
  image: z.string().url('Image must be a valid URL'),
  href: z.string().min(1, 'Link is required'),
  color: z.string().min(1, 'Color is required'),
  order: z.number().int('Order must be an integer').min(0, 'Order must be positive')
});

export const footerSectionSchema = z.object({
  contactAddress: z.string().min(5, 'Contact address must be at least 5 characters').max(500, 'Contact address must be at most 500 characters'),
  contactPhone: z.string().min(5, 'Contact phone must be at least 5 characters').max(50, 'Contact phone must be at most 50 characters'),
  contactEmail: z.string().email('Invalid email address'),
  newsletterTitle: z.string().min(2, 'Newsletter title must be at least 2 characters').max(100, 'Newsletter title must be at most 100 characters'),
  newsletterDescription: z.string().min(5, 'Newsletter description must be at least 5 characters').max(500, 'Newsletter description must be at most 500 characters'),
  newsletterPlaceholder: z.string().min(2, 'Newsletter placeholder must be at least 2 characters').max(100, 'Newsletter placeholder must be at most 100 characters'),
  copyright: z.string().min(5, 'Copyright text must be at least 5 characters').max(200, 'Copyright text must be at most 200 characters')
});

export const footerLinkSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1, 'Label is required').max(100, 'Label must be at most 100 characters'),
  href: z.string().min(1, 'Link is required'),
  order: z.number().int('Order must be an integer').min(0, 'Order must be positive').optional()
});

export const footerSocialMediaSchema = z.object({
  id: z.string().optional(),
  platform: z.string().min(1, 'Platform is required').max(50, 'Platform must be at most 50 characters'),
  href: z.string().url('Social media link must be a valid URL'),
  icon: z.string().min(1, 'Icon is required'),
  order: z.number().int('Order must be an integer').min(0, 'Order must be positive').optional()
});

export const reorderFooterLinksSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    order: z.number().int().min(0)
  }))
});

export const reorderFooterSocialMediaSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    order: z.number().int().min(0)
  }))
});

export const ctaBannerSchema = z.object({
  headline: z.string().min(5, 'Headline must be at least 5 characters').max(200, 'Headline must be at most 200 characters'),
  subtext: z.string().min(5, 'Subtext must be at least 5 characters').max(500, 'Subtext must be at most 500 characters').optional().or(z.literal('')),
  buttonText: z.string().min(2, 'Button text must be at least 2 characters').max(50, 'Button text must be at most 50 characters'),
  buttonHref: z.string().min(1, 'Button link is required')
});