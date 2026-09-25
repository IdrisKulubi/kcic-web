"use client"

import { useCallback, useState, useTransition } from "react"
import { ShieldWarning } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  submitWhistleblowerReport,
  type WhistleblowerCategory,
} from "@/lib/actions/whistleblower"
import { cn } from "@/lib/utils"

const CATEGORIES: { value: WhistleblowerCategory; label: string }[] = [
  { value: "fraud", label: "Fraud" },
  { value: "misconduct", label: "Misconduct" },
  { value: "safety", label: "Safety concern" },
  { value: "harassment", label: "Harassment" },
  { value: "corruption", label: "Corruption" },
  { value: "other", label: "Other" },
]

const initialForm = {
  category: "" as WhistleblowerCategory | "",
  subject: "",
  description: "",
  incidentDate: "",
  department: "",
  involvedParties: "",
  evidence: "",
  contactEmail: "",
  isAnonymous: true,
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function WhistleblowerDialog({
  initialOpen = false,
}: {
  initialOpen?: boolean
}) {
  const [open, setOpen] = useState(initialOpen)
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState<string | null>(null)
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const resetState = useCallback(() => {
    setForm(initialForm)
    setError(null)
    setReferenceNumber(null)
  }, [])

  const handleOpenChange = (next: boolean) => {
    setOpen(next)
    if (!next) {
      resetState()
    }
  }

  const updateField = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError(null)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!form.category) {
      setError("Please select a category for your report.")
      return
    }
    if (!form.subject.trim()) {
      setError("Please enter a subject for your report.")
      return
    }
    if (!form.description.trim()) {
      setError("Please describe what happened.")
      return
    }
    if (!form.isAnonymous) {
      if (!form.contactEmail.trim()) {
        setError("Please provide a contact email, or submit anonymously.")
        return
      }
      if (!isValidEmail(form.contactEmail)) {
        setError("Please enter a valid email address.")
        return
      }
    }

    startTransition(async () => {
      const result = await submitWhistleblowerReport({
        category: form.category as WhistleblowerCategory,
        subject: form.subject.trim(),
        description: form.description.trim(),
        incidentDate: form.incidentDate || undefined,
        department: form.department.trim() || undefined,
        involvedParties: form.involvedParties.trim() || undefined,
        evidence: form.evidence.trim() || undefined,
        contactEmail: form.isAnonymous
          ? undefined
          : form.contactEmail.trim(),
        isAnonymous: form.isAnonymous,
      })

      if (!result.success) {
        setError(result.error ?? "Something went wrong. Please try again.")
        return
      }

      setReferenceNumber(result.referenceNumber ?? null)
    })
  }

  const showSuccess = referenceNumber !== null

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            type="button"
            size="sm"
            className="min-h-11 border-transparent bg-[#7fcc2f] px-5 text-[0.85rem] font-medium text-[#1b241d] hover:bg-[#e8f4dc] hover:text-[#1b241d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7fcc2f]"
          />
        }
      >
        <ShieldWarning className="size-4 text-[#1b241d]" aria-hidden />
        Whistleblower
      </DialogTrigger>

      <DialogContent
        className={cn(
          "max-h-[min(90svh,44rem)] overflow-y-auto border-[#1b241d]/10 bg-[#f7fbf5] p-0 sm:max-w-lg",
          "ring-[#1b241d]/10"
        )}
      >
        <div className="p-5 sm:p-6">
          {showSuccess ? (
            <div className="space-y-5 py-2">
              <DialogHeader className="text-left">
                <DialogTitle className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-xl tracking-tight text-[#1b241d]">
                  Report received
                </DialogTitle>
                <DialogDescription className="text-[#566159]">
                  Thank you for speaking up. Your report has been submitted
                  securely and will be reviewed by our team.
                </DialogDescription>
              </DialogHeader>

              <div
                className="rounded-xl border border-[#7FCC2F]/35 bg-[#7FCC2F]/12 px-4 py-3"
                role="status"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-[#315e13]">
                  Your reference number
                </p>
                <p className="mt-1 font-mono text-lg font-semibold text-[#1b241d]">
                  {referenceNumber}
                </p>
                <p className="mt-2 text-sm text-[#566159]">
                  Save this number if you need to follow up later.
                </p>
              </div>

              <Button
                type="button"
                className="w-full bg-[#7FCC2F] text-[#f7fbf5] hover:bg-[#27332a]"
                onClick={() => handleOpenChange(false)}
              >
                Close
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader className="text-left">
                <DialogTitle className="font-['Gotham','Century_Gothic',Arial,sans-serif] text-xl tracking-tight text-[#1b241d]">
                  Submit a confidential report
                </DialogTitle>
                <DialogDescription className="text-[#566159]">
                  Reports are handled confidentially. You may remain anonymous;
                  we only ask for contact details if you choose to share them.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="mt-5 space-y-5">
                <FieldGroup className="gap-4">
                  <Field>
                    <FieldLabel htmlFor="wb-category">Category</FieldLabel>
                    <NativeSelect
                      id="wb-category"
                      required
                      value={form.category}
                      onChange={(e) =>
                        updateField(
                          "category",
                          e.target.value as WhistleblowerCategory
                        )
                      }
                      className="w-full"
                      aria-invalid={!form.category && error ? true : undefined}
                    >
                      <NativeSelectOption value="" disabled>
                        Select a category
                      </NativeSelectOption>
                      {CATEGORIES.map((item) => (
                        <NativeSelectOption
                          key={item.value}
                          value={item.value}
                        >
                          {item.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="wb-subject">Subject</FieldLabel>
                    <Input
                      id="wb-subject"
                      required
                      value={form.subject}
                      onChange={(e) => updateField("subject", e.target.value)}
                      placeholder="Brief summary of the concern"
                      maxLength={200}
                      className="bg-white/80"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="wb-description">Description</FieldLabel>
                    <Textarea
                      id="wb-description"
                      required
                      value={form.description}
                      onChange={(e) =>
                        updateField("description", e.target.value)
                      }
                      placeholder="What happened? Include dates, locations, and any relevant context."
                      rows={4}
                      className="min-h-28 resize-y bg-white/80"
                    />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="wb-incident-date">
                        Incident date
                        <span className="font-normal text-muted-foreground">
                          {" "}
                          (optional)
                        </span>
                      </FieldLabel>
                      <Input
                        id="wb-incident-date"
                        type="date"
                        value={form.incidentDate}
                        onChange={(e) =>
                          updateField("incidentDate", e.target.value)
                        }
                        className="bg-white/80"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="wb-department">
                        Department
                        <span className="font-normal text-muted-foreground">
                          {" "}
                          (optional)
                        </span>
                      </FieldLabel>
                      <Input
                        id="wb-department"
                        value={form.department}
                        onChange={(e) =>
                          updateField("department", e.target.value)
                        }
                        placeholder="e.g. Programmes"
                        className="bg-white/80"
                      />
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel htmlFor="wb-involved">
                      People involved
                      <span className="font-normal text-muted-foreground">
                        {" "}
                        (optional)
                      </span>
                    </FieldLabel>
                    <Input
                      id="wb-involved"
                      value={form.involvedParties}
                      onChange={(e) =>
                        updateField("involvedParties", e.target.value)
                      }
                      placeholder="Names or roles, if known"
                      className="bg-white/80"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="wb-evidence">
                      Supporting information
                      <span className="font-normal text-muted-foreground">
                        {" "}
                        (optional)
                      </span>
                    </FieldLabel>
                    <Textarea
                      id="wb-evidence"
                      value={form.evidence}
                      onChange={(e) => updateField("evidence", e.target.value)}
                      placeholder="Links, document references, or other details that may help"
                      rows={2}
                      className="resize-y bg-white/80"
                    />
                  </Field>

                  <Field
                    className="rounded-xl border border-[#1b241d]/10 bg-white/50 p-4"
                    data-disabled={false}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <FieldLabel
                          htmlFor="wb-anonymous"
                          className="text-[#1b241d]"
                        >
                          Submit anonymously
                        </FieldLabel>
                        <FieldDescription>
                          When enabled, we will not store your email with this
                          report.
                        </FieldDescription>
                      </div>
                      <Switch
                        id="wb-anonymous"
                        checked={form.isAnonymous}
                        onCheckedChange={(checked) =>
                          updateField("isAnonymous", checked)
                        }
                        aria-label="Submit anonymously"
                      />
                    </div>

                    {!form.isAnonymous && (
                      <Field className="mt-4">
                        <FieldLabel htmlFor="wb-email">
                          Contact email
                        </FieldLabel>
                        <Input
                          id="wb-email"
                          type="email"
                          required
                          autoComplete="email"
                          value={form.contactEmail}
                          onChange={(e) =>
                            updateField("contactEmail", e.target.value)
                          }
                          placeholder="you@example.com"
                          className="bg-white/80"
                        />
                      </Field>
                    )}
                  </Field>
                </FieldGroup>

                {error && (
                  <p
                    className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
                    role="alert"
                  >
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full min-h-10 bg-[#7FCC2F] text-[#f7fbf5] hover:bg-[#27332a] disabled:opacity-70"
                >
                  {isPending ? (
                    <>
                      <Spinner className="size-4" />
                      Submitting…
                    </>
                  ) : (
                    "Submit report"
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
