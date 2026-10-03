"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { useToast } from "@/components/ui/Toast";

export function OverlayDemo() {
  const [open, setOpen] = useState(false);
  const toast = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => setOpen(true)}>
        삭제 확인 열기
      </Button>
      <Button variant="outline" onClick={() => toast("견적 금액을 저장했습니다.", "success")}>
        알림 띄우기
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="신청 건을 삭제할까요?"
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setOpen(false);
                toast("신청 건을 삭제했습니다.", "danger");
              }}
            >
              삭제
            </Button>
          </>
        }
      >
        삭제한 신청 건은 되돌릴 수 없습니다.
      </Dialog>
    </div>
  );
}
