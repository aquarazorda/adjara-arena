import { useTranslation } from "react-i18next";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

export default function LoginDialogContent() {
  const { t } = useTranslation();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{t("login")}</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
}
