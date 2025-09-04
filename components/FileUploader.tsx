'use client'
import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { Button } from './ui/button'
import { cn, convertFileToUrl, getFileType } from '@/lib/utils'
import Thumbnail from './Thumbnail'

 interface Props {
  ownerId:string,
  accountId:string,
  className?:string
 }

const FileUploader = ({ownerId, accountId, className}:Props) => {
  const [files, setFiles] = useState<File[]>([])
  const onDrop = useCallback( async (acceptedFiles:File[])=> {
    setFiles(acceptedFiles)
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
     <div {...getRootProps()} className='cursor-pointer'>
      <input {...getInputProps()} />
      <Button type='button' className={cn('uploader-button', className)}>
          <img src='/assets/icons/upload.svg' alt='upload' width={24} height={24} className=''/>
          <p>Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className='uploader-preview-list'>
          <h4 className='h4 text-light-100'>Uploading</h4>
          {files.map((file, id)=> {
            const {type, extension} = getFileType(file.name)
            return (
            <li key={`${file.name}-${id}`} className='uploader-preview-item'>
              <div className='flex items-center gap-3'>
                <Thumbnail type={type} extension={extension} url={convertFileToUrl(file)}/>
                
              </div>
            </li>)
          })}
        </ul>
        
      )}
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default FileUploader