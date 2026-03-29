INSERT INTO deals (id, name, company_id, category, stage, description, amount, created_at, updated_at, archived_at, expected_closing_date, sales_id, index) VALUES
(1, 'Pi Phi 5K 2027', 1, 'print-project', 'in-negociation', '', 800, '2026-03-19T18:14:06.935758+00:00', '2026-03-19T18:14:06.935758+00:00', NULL, '2026-08-07', 1, 1),
(2, 'Onyx Coffee Lab New Shirts', 3, 'print-project', 'proposal-sent', '', 1500, '2026-03-19T18:31:48.584021+00:00', '2026-03-19T18:31:48.584021+00:00', NULL, '2026-05-28', 1, 2),
(3, 'Texas Bass Pro Championship', 4, 'print-project', 'shipped', '', 15000, '2026-03-19T18:42:31.59486+00:00', '2026-03-19T18:42:31.59486+00:00', NULL, '2026-01-30', 1, 0),
(4, 'Pi Phi Moms Weekend', 1, 'print-project', 'printing', '', 1000, '2026-03-19T18:46:55.838026+00:00', '2026-03-19T18:46:55.838026+00:00', NULL, '2026-03-06', 1, 0),
(5, 'University Spirit Committee', 2, 'print-project', 'won', 'Custom Razorback-themed shirts for campus event volunteers', 18000, '2026-03-19T19:09:52.389342+00:00', '2026-03-19T19:09:52.389342+00:00', NULL, '2026-05-28', 1, 1),
(6, 'Tourism Retail Partnership', 8, 'print-project', 'opportunity', 'Branded apparel sold in visitor center gift shop', 25000, '2026-03-19T19:10:36.675812+00:00', '2026-03-19T19:10:36.675812+00:00', NULL, '2026-05-19', 1, 2),
(7, 'Co-Branded Apparel Line', 9, 'print-project', 'opportunity', 'Branded tees and hats sold at brewery and online', 8000, '2026-03-19T19:11:23.3637+00:00', '2026-03-19T19:11:23.3637+00:00', NULL, '2026-06-22', 1, 1),
(8, 'Alumni Reunion Merchandise Package', 10, 'print-project', 'proposal-sent', '', 9800, '2026-03-19T19:12:19.562427+00:00', '2026-03-19T19:12:19.562427+00:00', NULL, '2026-05-21', 1, 0),
(9, '2027 Howdy @ Baylor', 12, '', 'opportunity', '', 0, '2026-03-24T21:17:56.549206+00:00', '2026-03-24T21:17:56.549206+00:00', NULL, '2026-07-09', 1, 0)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  company_id = EXCLUDED.company_id,
  category = EXCLUDED.category,
  stage = EXCLUDED.stage,
  description = EXCLUDED.description,
  amount = EXCLUDED.amount,
  expected_closing_date = EXCLUDED.expected_closing_date,
  index = EXCLUDED.index;
