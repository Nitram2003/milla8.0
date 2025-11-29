package com.example.backend.BackEnd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.BackEnd.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
