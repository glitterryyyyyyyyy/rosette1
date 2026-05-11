package com.rosette.boutique.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {
    private final Cloudinary cloudinary;

    public List<String> uploadImages(List<MultipartFile> files) throws IOException {
        List<String> urls = new ArrayList<>();
        
        for (MultipartFile file : files) {
            if (file.isEmpty()) {
                throw new IOException("Cannot upload empty file");
            }
            
            // Validate file size (max 5MB)
            if (file.getSize() > 5 * 1024 * 1024) {
                throw new IOException("File size exceeds 5MB limit");
            }
            
            // Validate file type
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                throw new IOException("Invalid file type. Only images are allowed");
            }
            
            try {
                @SuppressWarnings("unchecked")
                Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
                String url = (String) uploadResult.get("url");
                if (url != null) {
                    urls.add(url);
                } else {
                    throw new IOException("Failed to get image URL from Cloudinary");
                }
            } catch (Exception e) {
                throw new IOException("Failed to upload image: " + e.getMessage(), e);
            }
        }
        
        if (urls.isEmpty()) {
            throw new IOException("No images were uploaded successfully");
        }
        
        return urls;
    }
}

