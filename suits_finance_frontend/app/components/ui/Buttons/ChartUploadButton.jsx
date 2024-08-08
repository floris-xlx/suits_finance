import React, { useState } from "react";
import { PlusIcon, CloudArrowUpIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { UploadChart } from "@/app/client/supabase/SupabaseBucketImages.js";


export default function App({ setNotification }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isChartUploaded, setIsChartUploaded] = useState(false);
  const [isChartUploading, setIsChartUploading] = useState(false);
  const [isChartUploadError, setIsChartUploadError] = useState(false);

  const [imageUploadProgress, setImageUploadProgress] = useState(0);
  const [imageFileSize, setImageFileSize] = useState(0);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [imageUploadSuccess, setImageUploadSuccess] = useState(null);
  const [imageUploadUrl, setImageUploadUrl] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [chartUrl, setChartUrl] = useState(null);
  const [intentUpload, setIntentUpload] = useState(false);

  function handleUploadIntent() {
    setIntentUpload(true);
  }

  function setChartLink(e) {
    setIntentUpload(false);
    setChartUrl(e);
  }

  function handleUploadChart() {
    const imageFile = document.getElementById("af-submit-app-upload-images").files[0];
    if (!imageFile) {
      setNotification("NoFileSelected");
      setIsChartUploading(false);
      return;
    }

    if (!isFileAllowed(imageFile)) {
      setIsChartUploading(false);
      return;
    }

    const randomProgress = Math.floor(Math.random() * 20);

    setIsChartUploading(true);
    setIsChartUploaded(false);
    setIsChartUploadError(false);
    setImageUploadProgress(0);
    setImageUploadError(null);
    setImageUploadProgress();
    setImageUploadProgress(randomProgress);
    setImageUploadSuccess(null);
    setImageUploadUrl(null);
    setImageUploadProgress(20 + randomProgress);
    setImageName(null);


    if (imageFile) {
      setImageFileSize(imageFile.size);
      UploadChart(imageFile)
        .then((data) => {
          setImageUploadProgress(100);
          setImageUploadSuccess(true);
          setImageUploadUrl(data.url);
          setImageName(data.name);
          setIsChartUploading(false);
          setIsChartUploaded(true);
        })
        .catch((error) => {
          setImageUploadError(error);
          setIsChartUploading(false);
          setIsChartUploadError(true);
        });
    }
  }
  const allowed_file_types = ["image/png", "image/jpeg", "image/jpg"];

  function isFileAllowed(file) {
    // if not then call setNotification("OnlyImageFilesAllowed");
    if (!allowed_file_types.includes(file.type)) {
      setNotification("OnlyImageFilesAllowed");
      setTimeout(() => {
        setNotification(null);
      }, 5500);
      return false;
    }
    return true;
  }


  return (
    <div className="space-y-2">

      {!intentUpload && (
        <div>
          <label className="inline-block text-sm font-medium text-color-accent mt-2.5 mb-1">
            Upload chart
          </label>

          <button className="group p-2 sm:p-4 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2  w-full border-color hover:border-[var(--text-color-accent-secondary)] transition"
            onClick={handleUploadIntent}
          >

            < PlusIcon className="mx-auto icon-color size-100 h-5 w-5" aria-hidden="true" />

            <span className="mt-2 block text-sm text-color-accent-secondary">
              Upload an image or add a link
            </span>
          </button>
        </div>
      )}


      {intentUpload && (
        <>
          <div>
            {isChartUploading && (
              <>
                <div className=" mb-2 flex justify-between items-center mt-3">
                  <div className="flex items-center gap-x-3">
                    <span className="size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg">

                    </span>
                    <div className="-ml-4">
                      <p className=" text-sm font-medium text-gray-800 ">{imageName}</p>
                      <p className="text-xs text-gray-500 ">{imageFileSize}</p>
                    </div>
                  </div>

                </div>

                <div className="flex items-center gap-x-3 whitespace-nowrap">
                  <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100">
                    <div className="flex flex-col justify-center rounded-full overflow-hidden bg-indigo-500 text-xs text-white text-center whitespace-nowrap transition duration-500 " style={{ width: `${imageUploadProgress}%` }}></div>

                  </div>
                  <div className="w-6 text-end">
                    <span className="text-sm text-gray-800 ">{imageUploadProgress}%</span>
                  </div>
                </div>
              </>
            )}
          </div>


          <div className="block text-sm font-medium text-color-accent mt-2">

            Chart image
            {!isChartUploaded && (
              <>
                <label for="af-submit-app-upload-images" className="group p-4 sm:p-7 block cursor-pointer text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 border-color hover:border-[var(--text-color-accent-secondary)] transition mt-1">

                  <input id="af-submit-app-upload-images" name="af-submit-app-upload-images" type="file" className="sr-only"
                    onChange={handleUploadChart}
                  ></input>

                  <CloudArrowUpIcon className="mx-auto icon-color size-100 h-5 w-5" aria-hidden="true" />

                  <span className="mt-2 block text-sm text-color-accent-secondary">
                    Upload from device or drag and drop
                  </span>
                </label>

              </>
            )}

            {isChartUploaded && (
              <>
                <label for="af-submit-app-upload-images" className="group p-2 sm:p-3 block  text-center border-2 border-dashed border-gray-200 rounded-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 border-color hover:border-[var(--text-color-accent-secondary)] transition mt-1 cursor-default pointer-events-none">

                  <input id="af-submit-app-upload-images" name="af-submit-app-upload-images" type="file" className="sr-only"
                    onChange={handleUploadChart}
                  ></input>

                  < CheckBadgeIcon className="mx-auto brand-color size-100 h-5 w-5" aria-hidden="true" />

                  <span className="mt-2 block text-sm text-color-accent-secondary">
                    Successfully uploaded the chart
                  </span>
                </label>
              </>
            )}


            {!isChartUploaded && (
              <>
                <div className="relative mt-2">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-top-color " />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="background-color px-2 text-sm text-color-accent-secondary">Or</span>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="chartLink"
                    className="block text-sm font-medium text-color-accent"
                  >
                    Chart link
                  </label>

                  <div className="mt-1">
                    <input
                      id="chartLink"
                      name="chartLink"
                      type="chartLink"
                      autoComplete="chartLink"
                      placeholder=""
                      required
                      onChange={(e) => setChartLink(e.target.value)}
                      value={chartUrl}
                      className="block w-full appearance-none rounded-md input-field px-3 py-2  shadow-sm focus:outline-none focus:ring-2   focus:ring-indigo-500 sm:text-sm font-medium"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}