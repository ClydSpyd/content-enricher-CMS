/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import TextEditor from "@/components/text-editor";
import { useQueue } from "@/contexts/queue-context";
import dynamic from "next/dynamic";
import InputField from "@/components/input-field";
import TagSelector from "@/components/tag-selector";
import { useIsFirstRender } from "@/hooks/isFirstRender";
import ConfirmModal from "./_components/confirm-modal";
import useCreate from "./_hooks/useCreate";

const Queue = dynamic(() => import("./_components/queue"), { ssr: false });
export default function CreatePage() {
  const isFirstRender = useIsFirstRender()
  const { queuedItems = [] } = useQueue();

  const {
    submitData,
    confirmSaved,
    formFilled,
    localFields,
    selectedArticle,
    saveCallback,
    handleDismiss,
    handleInputChange,
    handleTags,
    setSelectedArticle,
  } = useCreate();

 
  return (
    <div className="w-screen h-full flex">
    <div className="min-w-[500px] max-w-[500px] h-full py-1 px-2 rounded-sm">
      <h4 className="font-semibold text-sm text-indigo-600 mb-1">Queued items:</h4>
        <Queue
          items={queuedItems}
          onSelect={setSelectedArticle}
          selectedId={selectedArticle?.url ?? ""}
        />
      </div>
      <div className="overflow-y-auto grow pr-4 flex flex-col gap-1 relative">
        <div className="w-full flex flex-col gap-2 mb-1">
          <InputField
            placeholder="Article Title"
            value={localFields.title}
            onChange={(val: string) => handleInputChange(val, "title")}
          />
          <InputField
            placeholder="Caption"
            value={localFields.caption}
            onChange={(val: string) => handleInputChange(val, "caption")}
          />
          <TagSelector
            tags={localFields.tags}
            setTags={(tags: string[]) => handleTags(tags)}
          />
        </div>
        {selectedArticle && !isFirstRender && (
          <TextEditor
            saveCallback={saveCallback}
            postSubmistMsg={submitData.msg}
            isError={submitData.error}
            canSubmit={formFilled}
          />
        )}
        {confirmSaved && <ConfirmModal handleDismiss={handleDismiss} />}
      </div>
    </div>
  );
}
