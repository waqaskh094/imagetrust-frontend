// Lucide icon paths (lucide.dev), stroke 2.75.
function Icon({ className = "size-5", children }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className}>
      {children}
    </svg>
  );
}

export const ShieldCheckIcon = (p) => <Icon {...p}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></Icon>;
export const UploadIcon = (p) => <Icon {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5" /><path d="M12 3v12" /></Icon>;
export const CheckCircleIcon = (p) => <Icon {...p}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></Icon>;
export const TriangleAlertIcon = (p) => <Icon {...p}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></Icon>;
export const CircleHelpIcon = (p) => <Icon {...p}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></Icon>;
export const CircleAlertIcon = (p) => <Icon {...p}><circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" /></Icon>;
export const InfoIcon = (p) => <Icon {...p}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></Icon>;
export const MoonIcon = (p) => <Icon {...p}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></Icon>;
export const SunIcon = (p) => <Icon {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></Icon>;
export const CopyIcon = (p) => <Icon {...p}><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></Icon>;
export const CheckIcon = (p) => <Icon {...p}><path d="M20 6 9 17l-5-5" /></Icon>;
export const RotateIcon = (p) => <Icon {...p}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></Icon>;
export const XIcon = (p) => <Icon {...p}><path d="M18 6 6 18M6 6l12 12" /></Icon>;
export const ScanSearchIcon = (p) => <Icon {...p}><path d="M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2m0 10v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /><circle cx="12" cy="12" r="3" /><path d="m16 16-1.9-1.9" /></Icon>;
export const LoaderIcon = (p) => <Icon {...p}><path d="M21 12a9 9 0 1 1-6.22-8.56" /></Icon>;
export const ImageIcon = (p) => <Icon {...p}><rect width="18" height="18" x="3" y="3" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21" /></Icon>;
export const ChevronDownIcon = (p) => <Icon {...p}><path d="m6 9 6 6 6-6" /></Icon>;
