package com.techmatrix18.controller.web;

import com.techmatrix18.dto.PositionDto;
import com.techmatrix18.model.Position;
import com.techmatrix18.service.PositionService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import java.time.LocalDateTime;
import java.util.logging.Logger;

/**
 * Position controller with endpoints for positions pages
 *
 * @author Alexander Kuziv
 * @since 02.10.2025
 * @company TechMatrix18
 * @version 0.0.1
 */

@Controller
public class PositionViewController {

    Logger log = Logger.getLogger(PositionViewController.class.getName());

    private final PositionService positionService;

    public PositionViewController(PositionService positionService) {
        this.positionService = positionService;
    }

    @GetMapping("/positions")
    public String getAllRoles(@RequestParam(defaultValue = "0") int page,
                              @RequestParam(defaultValue = "10") int size,
                              Model model) {
        Page<Position> positionsPage = positionService.getAllPaginated(page, size);

        model.addAttribute("positionsPage", positionsPage);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", positionsPage.getTotalPages());

        return "positions/index";
    }

    @GetMapping("/positions/add")
    public String addPosition(Model model) {
        model.addAttribute("positionDto", new PositionDto()); // empty form
        return "positions/add";
    }

    @PostMapping("/positions/add")
    public String addPositionPost(@Valid @ModelAttribute("positionDto") PositionDto positionDto,
                              BindingResult result,
                              Model model,
                              RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "positions/add"; // return form with errors
        }

        // Mapping DTO → Entity
        Position position = new Position();
        position.setTitle(positionDto.getTitle());
        position.setCreatedAt(LocalDateTime.now());
        position.setUpdatedAt(LocalDateTime.now());

        // save Position in database
        positionService.addPosition(position);
        redirectAttributes.addFlashAttribute("successMessage", "Position was successfully added!");

        return "redirect:/positions";
    }

    @GetMapping("/positions/edit/{id}")
    public String editPosition(@PathVariable Long id, Model model) {
        PositionDto positionDto = positionService.getByIdDto(id);
        model.addAttribute("positionDto", positionDto);
        return "positions/edit";
    }

    @PostMapping("/positions/edit")
    public String editPositionPost(@Valid @ModelAttribute("positionDto") PositionDto positionDto,
                               BindingResult result,
                               Model model,
                               RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "positions/edit"; // return form with errors
        }

        // Mapping DTO → Entity
        Position position = positionService.getById(positionDto.getId());
        position.setTitle(positionDto.getTitle());
        position.setUpdatedAt(LocalDateTime.now());

        positionService.updatePosition(position); // update entity
        redirectAttributes.addFlashAttribute("successMessage", "Position was successfully updated!");
        return "redirect:/positions";
    }

    @GetMapping("/positions/view/{id}")
    public String viewPosition(@PathVariable Long id, Model model) {
        Position position = positionService.getById(id);
        model.addAttribute("position", position);
        return "positions/view";
    }

    @GetMapping("/positions/delete/{id}")
    public String deletePosition(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        positionService.deletePosition(id);
        redirectAttributes.addFlashAttribute("successMessage", "Position was successfully deleted!");
        return "redirect:/positions";
    }
}

