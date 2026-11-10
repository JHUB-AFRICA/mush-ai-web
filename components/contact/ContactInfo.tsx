import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function EmailIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"
      />
    </svg>
  );
}

function PhoneIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M9.004 3.416C8.432 2.606 7.64 2.241 6.8 2.25c-.797.008-1.573.349-2.221.803A6.2 6.2 0 0 0 2.92 4.79c-.41.649-.706 1.416-.666 2.165c.193 3.603 2.22 7.453 5.067 10.302c2.845 2.846 6.644 4.824 10.48 4.446c.752-.074 1.463-.457 2.044-.945a5.8 5.8 0 0 0 1.443-1.84c.34-.692.543-1.49.431-2.267c-.116-.81-.569-1.534-1.402-2.014a16 16 0 0 1-.512-.31c-.15-.093-.31-.194-.504-.31a7.5 7.5 0 0 0-1.249-.618c-.447-.163-.958-.27-1.49-.197c-.551.076-1.063.336-1.506.802c-.341.36-.843.472-1.549.268c-.718-.208-1.526-.724-2.228-1.422c-.702-.696-1.233-1.51-1.46-2.245c-.224-.728-.125-1.263.225-1.632c.473-.498.725-1.052.778-1.638c.052-.57-.09-1.106-.293-1.574c-.304-.699-.82-1.394-1.224-1.936a22 22 0 0 1-.3-.41"
      />
    </svg>
  );
}

function LocationIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="currentColor"
        d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
      />
    </svg>
  );
}

function WorkingHoursIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 1.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5V7h-1V2H4v12h3v1H3.5a.5.5 0 0 1-.5-.5zM11 5H5V4h6zM9 7H5V6h4zm-2 4.5A3.5 3.5 0 0 1 10.5 8a.5.5 0 0 1 .5.5V11h2.5a.5.5 0 0 1 .5.5a3.5 3.5 0 1 1-7 0"
      />
    </svg>
  );
}

const CONTACT_DETAILS = [
  {
    Icon: EmailIcon,
    title: "Email Address",
    value: "info@mushai.com",
    href: "mailto:info@mushai.com",
  },
  {
    Icon: PhoneIcon,
    title: "Phone Number",
    value: "+254 700 000 000",
    href: "tel:+254700000000",
  },
  {
    Icon: LocationIcon,
    title: "Our Location",
    value: "Juja, Kiambu County, Kenya",
  },
  {
    Icon: WorkingHoursIcon,
    title: "Working Hours",
    value: "Monday – Friday, 8:00 AM – 5:00 PM",
  },
];

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Contact Information</h2>

      <p className="mt-3 max-w-md leading-7 text-white/80">
        Reach out to the Mush AI team for product inquiries, order
        assistance, and general support.
      </p>

      <div className="mt-8 space-y-6">
        {CONTACT_DETAILS.map((item) => (
          <div key={item.title} className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-container text-on-primary-container border border-white/10">
              <item.Icon className="h-6 w-6" />
            </div>

            <div>
              <h3 className="font-semibold">{item.title}</h3>
              {item.href ? (
                <a
                  href={item.href}
                  className="mt-1 block text-sm text-white/80 transition hover:text-primary-fixed-dim"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-1 text-sm text-white/80">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

