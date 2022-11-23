//import { useRouter } from "next/router";
import { useEffect } from 'react';

const DEFAULT_WARNING_TEXT =
  'You have unsaved changes - are you sure you wish to leave this page?';

export const useBeforeLeave = ({
  hasUnsavedChanges = false,
  warningText = DEFAULT_WARNING_TEXT,
}) => {
  //const router = useRouter();
  // prompt the user if they try and leave with unsaved changes
  useEffect(() => {
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    window.addEventListener('beforeunload', handleWindowClose);
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  }, [hasUnsavedChanges]);
  return {
    isUnsaved: hasUnsavedChanges,
  };
};
