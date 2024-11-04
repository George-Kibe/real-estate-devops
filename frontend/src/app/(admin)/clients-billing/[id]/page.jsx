import React from 'react'
import { CircleUserRound, Image } from 'lucide-react'

const SingleBilling = () => {
  return (
    <div className=" p-4 md:p-8">
      <form>
        <div className="">
            <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold ">Profile</h2>
            <p className="mt-1 text-sm/6 ">
                This information will be displayed publicly so be careful what you share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm/6 font-medium ">
                    Username
                </label>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3  sm:text-sm">workcation.com/</span>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="janesmith"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1  placeholder: focus:ring-0 sm:text-sm/6"
                    />
                    </div>
                </div>
                </div>

                <div className="col-span-full">
                <label htmlFor="about" className="block text-sm/6 font-medium ">
                    About
                </label>
                <div className="mt-2">
                    <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder: focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    defaultValue={''}
                    />
                </div>
                <p className="mt-3 text-sm/6 ">Write a few sentences about yourself.</p>
                </div>

                <div className="col-span-full">
                <label htmlFor="photo" className="block text-sm/6 font-medium ">
                    Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                    <CircleUserRound aria-hidden="true" className="h-12 w-12 " />
                    <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                    Change
                    </button>
                </div>
                </div>

                <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-sm/6 font-medium ">
                    Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                    <Image aria-hidden="true" className="mx-auto h-12 w-12 " />
                    <div className="mt-4 flex text-sm/6 ">
                        <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 ">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold ">Personal Information</h2>
            <p className="mt-1 text-sm/6 ">Use a permanent address where you can receive mail.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm/6 font-medium ">
                    First name
                </label>
                <div className="mt-2">
                    <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder: focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                </div>
                </div>

                <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm/6 font-medium ">
                    Last name
                </label>
                <div className="mt-2">
                    <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder: focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                </div>
                </div>

                <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm/6 font-medium ">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder: focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                </div>
                </div>

                <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-sm/6 font-medium ">
                    Country
                </label>
                <div className="mt-2">
                    <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                    >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                    </select>
                </div>
                </div>

                <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm/6 font-medium ">
                    Street address
                </label>
                <div className="mt-2">
                    <input
                    id="street-address"
                    name="street-address"
                    type="text"
                    autoComplete="street-address"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder: focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm/6 font-medium ">
                    City
                </label>
                <div className="mt-2">
                    <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder: focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                </div>
                </div>

                <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm/6 font-medium ">
                    State / Province
                </label>
                <div className="mt-2">
                    <input
                    id="region"
                    name="region"
                    type="text"
                    autoComplete="address-level1"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder: focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                </div>
                </div>

                <div className="sm:col-span-2">
                <label htmlFor="postal-code" className="block text-sm/6 font-medium ">
                    ZIP / Postal code
                </label>
                <div className="mt-2">
                    <input
                    id="postal-code"
                    name="postal-code"
                    type="text"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder: focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                </div>
                </div>
            </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold ">Notifications</h2>
            <p className="mt-1 text-sm/6 ">
                We'll always let you know about important changes, but you pick what else you want to hear about.
            </p>

            <div className="mt-10 space-y-10">
                <fieldset>
                <legend className="text-sm/6 font-semibold ">By Email</legend>
                <div className="mt-6 space-y-6">
                    <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                    </div>
                    <div className="text-sm/6">
                        <label htmlFor="comments" className="font-medium ">
                        Comments
                        </label>
                        <p className="">Get notified when someones posts a comment on a posting.</p>
                    </div>
                    </div>
                    <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                    </div>
                    <div className="text-sm/6">
                        <label htmlFor="candidates" className="font-medium ">
                        Candidates
                        </label>
                        <p className="">Get notified when a candidate applies for a job.</p>
                    </div>
                    </div>
                    <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                    </div>
                    <div className="text-sm/6">
                        <label htmlFor="offers" className="font-medium ">
                        Offers
                        </label>
                        <p className="">Get notified when a candidate accepts or rejects an offer.</p>
                    </div>
                    </div>
                </div>
                </fieldset>
                <fieldset>
                <legend className="text-sm/6 font-semibold ">Push Notifications</legend>
                <p className="mt-1 text-sm/6 ">These are delivered via SMS to your mobile phone.</p>
                <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                    <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-everything" className="block text-sm/6 font-medium ">
                        Everything
                    </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                    <input
                        id="push-email"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-email" className="block text-sm/6 font-medium ">
                        Same as email
                    </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                    <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="push-nothing" className="block text-sm/6 font-medium ">
                        No push notifications
                    </label>
                    </div>
                </div>
                </fieldset>
            </div>
            </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm/6 font-semibold ">
            Cancel
            </button>
            <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
            Save
            </button>
        </div>
      </form>
    </div>
  )
}

export default SingleBilling