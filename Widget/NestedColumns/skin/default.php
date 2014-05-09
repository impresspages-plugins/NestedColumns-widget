<div class="_container ipsNestedColsContainer">
<?php foreach($cols as $i => $columnUniqueStr) { ?>
    <div class="ipsNestedCol _col" style="width:<?php echo $widths[$i]; ?>%;">
        <?php
        $block = ipBlock($columnUniqueStr)->exampleContent(' ');
        if (!empty($static)) {
            $block->asStatic();
        }
        echo $block->render($revisionId); ?>
    </div>
<?php } ?>
</div>
