"use client";
import { Block } from "@blocknote/core";
import { useQueue } from "@/contexts/queue-context";
import { useEffect, useState } from "react";
import { LocalFields, defaultValues } from "../../types";
import API from "../../../../../api";
import { hasEmptyFields } from "../../helpers";

export default function useCreate() {
  const { queuedItems = [], removeItemFromQueue } = useQueue();
  const [submitData, setSubmitData] = useState<{
    msg: string | null;
    error: boolean;
  }>({ msg: null, error: false });
  const [confirmSaved, setConfirmSaved] = useState<boolean>(false);
  const [formFilled, setFormFilled] = useState<boolean>(false);
  const [localFields, setLocalFields] = useState<LocalFields>(defaultValues);
  const [selectedArticle, setSelectedArticle] = useState<FeedItem | null>(
    queuedItems[0]
  );

  useEffect(() => {
    setLocalFields({
      title: selectedArticle?.name ?? "",
      caption: "",
      tags: [],
      sourceUrl: selectedArticle?.url ?? "",
      imgUrl: selectedArticle?.imgUrl ?? "",
    });
  }, [selectedArticle]);

  useEffect(() => {
    setFormFilled(!hasEmptyFields(localFields));
  }, [localFields]);

  const saveCallback = async (blocks: Block[], html: string) => {
    const payload: Article = {
      ...localFields,
      source: "web",
      content: html,
      blocks,
    };
    const { data, error } = await API.article.createArticle(payload);
    if (data) {
      setConfirmSaved(true);
    } else if (error) {
      setSubmitData({ msg: "failed to save article", error: true });
    }
  };

  const handleDismiss = () => {
    setSelectedArticle(null);
    setLocalFields(defaultValues);
    removeItemFromQueue(selectedArticle?.url ?? "");
    setTimeout(() => {
      setSelectedArticle(queuedItems[0]);
      setConfirmSaved(false);
    }, 200);
  };

  const handleInputChange = (value: string, key: keyof typeof localFields) => {
    setLocalFields((prev: LocalFields) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTags = (tags: string[]) => {
    setLocalFields((prev: LocalFields) => ({
      ...prev,
      tags,
    }));
  };

  return {
    submitData,
    confirmSaved,
    formFilled,
    setFormFilled,
    saveCallback,
    handleDismiss,
    handleInputChange,
    handleTags,
    selectedArticle,
    setSelectedArticle,
    localFields,
    setLocalFields,
  };
}
