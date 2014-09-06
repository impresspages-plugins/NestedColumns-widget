<div class="_nestedContainer ipsNestedColsContainer">
<?php foreach($cols as $i => $columnUniqueStr) { ?>
    <div class="ipsNestedCol _nestedCol" style="width:<?php echo $widths[$i]; ?>%;">
        <?php
        $block = ipBlock($columnUniqueStr)->exampleContent(' ');
        if (!empty($static)) {
            $block->asStatic();
        }
        echo $block->render($revisionId); ?>
    </div>
<?php } ?>
</div>
