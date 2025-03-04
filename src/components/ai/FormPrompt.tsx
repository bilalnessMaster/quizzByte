"use client";

import { useQcmStore } from "@/store/useQcm";
import { Loader, Play, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Qcm } from "@/types/types";

const FormPrompt = () => {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject");

  const { setQcmData, QcmsData, setStart } = useQcmStore();


  const [prompt, setPrompt] = useState(
    subject ? `Donne-moi 10 QCM sur ${subject}` : "Donne-moi 10 QCM sur un sujet."
  );

  useEffect(() => {
    if (subject) {
      setPrompt(`Donne-moi 10 QCM sur ${subject}`);
    }
  }, [subject]);

  const { mutate: fetchingQcm, isPending } = useMutation({
    mutationKey: ["fetchingQcm"],
    mutationFn: async (topic: string) => {
      const { data } = await axios.post("/api/generateQcmwithprompt", { topic });
      return data?.qcms;
    },
    onSuccess: (data: Qcm[]) => {
      if (data?.length > 0) {
        setQcmData(data);
        toast.success("maintenant, commencez !");
    } else {
          toast.error("Aucun QCM trouvé.");
      }
    },
    onError: (error: Error & { message?: string }) => {
      toast.error("Une erreur s'est produite : " + (error?.message || JSON.stringify(error)));
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prompt.trim() !== "") {
      fetchingQcm(prompt);
    } else {
      toast.error("Ne laissez pas le champ vide.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border border-gray-200 px-2 py-2 rounded-md flex flex-col gap-2 w-2/3 mx-auto">
      <label className="label">
        <span className="font-dm text-lg">Je veux réviser les ...</span>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          name="prompt"
          className="w-full dark:bg-neutral-600 bg-[#F6F6F6] rounded outline-none border-none text-sm"
          placeholder="Ex: Donne-moi un QCM difficile sur la science avec 15 questions."
        />
      </label>


      <label>
        {QcmsData?.length > 0 ? (
          <button
            type="button"
            className="flex justify-center w-full group/start bg-gray-50 rounded-full"
            disabled={isPending}
            onClick={() => setStart(true)}
          >
            <span className="flex group-hover/start:gap-1 transition-all duration-300 items-center gap-4 py-2">
              <Play strokeWidth={2} size={20} />
              <span className="text-xl font-bricolage">Démarrer</span>
            </span>
          </button>
        ) : (
          <button
            type="submit"
            className="flex justify-center group/generate w-full h-12 items-center bg-gray-50 rounded dark:bg-neutral-600"
            disabled={isPending}
          >
            {isPending ? (
              <Loader strokeWidth={2} size={25} className="transition-all animate-spin" />
            ) : (
              <span className="flex group-hover/generate:gap-1 transition-all duration-300 items-center gap-4 py-2">
                <Sparkles strokeWidth={1.2} size={20} />
                <span className="text-xl font-bricolage">Générer</span>
              </span>
            )}
          </button>
        )}
      </label>
    </form>
  );
};

export default FormPrompt;
